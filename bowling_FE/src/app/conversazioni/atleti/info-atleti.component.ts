import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AtletaService } from '../../servizi/atleta.service';
import { Atleta } from '../../modelli/atleta.model';
import { SessionService } from '../../servizi/session.service';

interface AtletaConStatistiche extends Atleta {
  Numero_partite?: number;
  Totale_punti?: number;
  Media?: number;
}

@Component({
  selector: 'app-info-atleti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-atleti.component.html',
  styleUrl: './info-atleti.component.css'
})
export class InfoAtletiComponent implements OnInit {
  atleta: AtletaConStatistiche | null = null;
  fotoUrl: string = '';
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute, private router: Router, private atletaService: AtletaService, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.isAdmin = this.sessionService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caricaAtleta(+id);
    }
  }

  caricaAtleta(id: number): void {
    this.atletaService.getAtletaById(id).subscribe({
      next: (data) => {
        this.atleta = data;
        // Costruisci URL foto usando Nome_Cognome
        if (this.atleta.Nome && this.atleta.Cognome) {
          const nomeFile = `${this.atleta.Nome}_${this.atleta.Cognome}`;
          this.fotoUrl = `/images/players/${nomeFile}.jpg`;
        }
      },
      error: (err) => {
        console.error('Errore caricamento atleta:', err);
      }
    });
  }

  modificaAtleta(): void {
    if (this.atleta) {
      this.router.navigate(['/atleti/modifica', this.atleta.ID_atleta]);
    }
  }

  tornaAllaLista(): void {
    this.router.navigate(['/atleti']);
  }

  fotoError(): void {
    // Nasconde l'immagine se non esiste
    this.fotoUrl = '';
  }
}
