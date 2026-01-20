import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from database_wrapper import DatabaseWrapper
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) # Sblocca la comunicazione con Angular

db = DatabaseWrapper(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_DATABASE"),
    port=os.getenv("DB_PORT")
)

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(db.get_all_tasks())

@app.route("/tasks", methods=["POST"])
def add_task():
    dati = request.json
    db.aggiungi_task(dati["title"])
    return jsonify({"msg": "Aggiunto"}), 201

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    db.elimina_task(id)
    return jsonify({"msg": "Eliminato"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
