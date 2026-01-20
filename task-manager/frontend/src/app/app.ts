import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTitle: string = '';

  // Aggiungiamo 'cdr' per forzare l'aggiornamento della pagina
  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.caricaTasks();
  }

  caricaTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.cdr.detectChanges(); // <--- FORZA L'AGGIORNAMENTO DELLA PAGINA
      },
      error: (err) => console.error("Errore caricamento:", err)
    });
  }

  aggiungi() {
    if (this.newTitle.trim()) {
      this.taskService.addTask(this.newTitle).subscribe({
        next: () => {
          this.newTitle = '';
          this.caricaTasks(); // Richiama il caricamento
        },
        error: (err) => console.error("Errore aggiunta:", err)
      });
    }
  }

  elimina(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.caricaTasks(); // Richiama il caricamento
      },
      error: (err) => console.error("Errore eliminazione:", err)
    });
  }
}
