import pymysql

class DatabaseWrapper:
    def __init__(self, host, user, password, database, port):
        self.db_config = {
            'host': host,
            'user': user,
            'password': password,
            'database': database,
            'port': int(port),
            'cursorclass': pymysql.cursors.DictCursor
        }
        self.create_table()

    def connect(self):
        return pymysql.connect(**self.db_config)

    def execute_query(self, query, params=()):
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            conn.commit()
        conn.close()

    def fetch_query(self, query, params=()):
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            result = cursor.fetchall()
        conn.close()
        return result

    def create_table(self):
        self.execute_query('''
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        ''')

    def get_all_tasks(self):
        return self.fetch_query("SELECT * FROM tasks")

    def aggiungi_task(self, titolo):
        self.execute_query("INSERT INTO tasks (title) VALUES (%s)", (titolo,))

    def elimina_task(self, id_task):
        self.execute_query("DELETE FROM tasks WHERE id = %s", (id_task,))
