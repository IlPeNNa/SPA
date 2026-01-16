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
  loading: boolean = true;
  fotoUrl: string = '';
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private atletaService: AtletaService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.sessionService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caricaAtleta(+id);
    }
  }

  caricaAtleta(id: number): void {
    this.loading = true;
    this.atletaService.getAtletaById(id).subscribe({
      next: (data) => {
        this.atleta = data;
        // Costruisci URL foto (se esiste)
        this.fotoUrl = `/images/atleti/${id}.jpg`; // Percorso esempio
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore caricamento atleta:', err);
        this.loading = false;
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

  onFotoError(): void {
    // Nasconde l'immagine se non esiste
    this.fotoUrl = '';
  }
}
