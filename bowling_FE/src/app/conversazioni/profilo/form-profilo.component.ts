import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';

interface AtletaModifica {
  ID_atleta?: number;
  Nome: string;
  Cognome: string;
  Data_nascita: string;
  Sesso: string;
  Braccio_dominante: string;
  Stile_gioco: string;
}

@Component({
  selector: 'app-form-profilo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-profilo.component.html',
  styleUrl: './form-profilo.component.css'
})
export class FormProfiloComponent implements OnInit {
  atleta: AtletaModifica = {
    Nome: '',
    Cognome: '',
    Data_nascita: '',
    Sesso: 'M',
    Braccio_dominante: 'Dx',
    Stile_gioco: ''
  };
  loading: boolean = true;

  constructor(
    private router: Router,
    private atletaService: AtletaService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const user = this.sessionService.getLoggedUser();
    if (!user) {
      this.router.navigate(['/home']);
      return;
    }
    this.caricaProfilo(user.ID_utente);
  }

  caricaProfilo(idUtente: number): void {
    this.loading = true;
    this.atletaService.getByUserId(idUtente).subscribe({
      next: (data: any) => {
        this.atleta = {
          ID_atleta: data.ID_atleta,
          Nome: data.Nome,
          Cognome: data.Cognome,
          Data_nascita: this.formatDateForInput(data.Data_nascita),
          Sesso: data.Sesso,
          Braccio_dominante: data.Braccio_dominante,
          Stile_gioco: data.Stile_gioco
        };
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Errore caricamento profilo:', err);
        this.loading = false;
      }
    });
  }

  formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  salva(): void {
    if (this.atleta.ID_atleta) {
      this.atletaService.update(this.atleta.ID_atleta, this.atleta as any).subscribe({
        next: () => {
          this.router.navigate(['/profilo']);
        },
        error: (err: any) => {
          console.error('Errore aggiornamento profilo:', err);
          alert('Errore durante il salvataggio del profilo.');
        }
      });
    }
  }

  annulla(): void {
    this.router.navigate(['/profilo']);
  }
}
