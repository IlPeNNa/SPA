import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';

interface AtletaConStatistiche {
  ID_atleta: number;
  ID_utente: number;
  Nome: string;
  Cognome: string;
  Data_nascita: string;
  Sesso: string;
  Braccio_dominante: string;
  Stile_gioco: string;
  Numero_partite?: number;
  Totale_punti?: number;
  Media?: number;
}

@Component({
  selector: 'app-info-profilo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-profilo.component.html',
  styleUrl: './info-profilo.component.css'
})
export class InfoProfiloComponent implements OnInit {
  atleta: AtletaConStatistiche | null = null;
  loading: boolean = true;
  fotoUrl: string = '';

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
        this.atleta = data;
        // Costruisci URL foto usando Nome_Cognome
        if (this.atleta?.Nome && this.atleta?.Cognome) {
          const nomeFile = `${this.atleta.Nome}_${this.atleta.Cognome}`;
          this.fotoUrl = `/images/players/${nomeFile}.jpg`;
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Errore caricamento profilo:', err);
        this.loading = false;
      }
    });
  }

  modificaProfilo(): void {
    this.router.navigate(['/profilo/modifica']);
  }

  onFotoError(): void {
    this.fotoUrl = '';
  }

  calcolaEta(): number | null {
    if (!this.atleta?.Data_nascita) return null;
    const oggi = new Date();
    const nascita = new Date(this.atleta.Data_nascita);
    let eta = oggi.getFullYear() - nascita.getFullYear();
    const m = oggi.getMonth() - nascita.getMonth();
    if (m < 0 || (m === 0 && oggi.getDate() < nascita.getDate())) {
      eta--;
    }
    return eta;
  }
}
