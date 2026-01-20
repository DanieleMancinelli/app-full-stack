import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Prendi l'URL della porta 5000 dalla tab PORTS e aggiungi /tasks alla fine
  private apiUrl = 'https://obscure-fiesta-jjrp9jrg4vwxcxvp-5000.app.github.dev/tasks';

  constructor(private http: HttpClient) { }

  // GET: Recupera i task
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST: Aggiunge un task
  addTask(title: string): Observable<any> {
    return this.http.post(this.apiUrl, { title: title });
  }

  // DELETE: Elimina un task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}