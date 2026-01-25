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
  Sesso: 'M' | 'F';
  Braccio_dominante: 'Dx' | 'Sx';
  Stile_gioco: string;
  ID_utente?: number;
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

  constructor(private router: Router, private atletaService: AtletaService, private sessionService: SessionService) {}

  ngOnInit(): void {
    const user = this.sessionService.getLoggedUser();
    if (!user) {
      this.router.navigate(['/home']);
      return;
    }
    this.caricaProfilo(user.ID_utente);
  }

  caricaProfilo(idUtente: number): void {
    this.atletaService.getByUserId(idUtente).subscribe({
      next: (data: any) => {
        const atleti = Array.isArray(data) ? data : [data];
        if (atleti.length > 0) {
          const atletaData = atleti[0];
          this.atleta = {
            ID_atleta: atletaData.ID_atleta,
            Nome: atletaData.Nome,
            Cognome: atletaData.Cognome,
            Data_nascita: this.formatoDataForm(atletaData.Data_nascita),
            Sesso: atletaData.Sesso,
            Braccio_dominante: atletaData.Braccio_dominante,
            Stile_gioco: atletaData.Stile_gioco,
            ID_utente: atletaData.ID_utente
          };
        }
      },
      error: (err: any) => {
        console.error('Errore caricamento profilo:', err);
      }
    });
  }

  formatoDataForm(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  salva(): void {
    if (this.atleta.ID_atleta) {
      const AtletaModifica = {
        Nome: this.atleta.Nome,
        Cognome: this.atleta.Cognome,
        Data_nascita: this.atleta.Data_nascita,
        Sesso: this.atleta.Sesso,
        Braccio_dominante: this.atleta.Braccio_dominante,
        Stile_gioco: this.atleta.Stile_gioco,
        ID_utente: this.atleta.ID_utente,
        ID_atleta: this.atleta.ID_atleta
      };
      
      this.atletaService.update(this.atleta.ID_atleta, AtletaModifica).subscribe({
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