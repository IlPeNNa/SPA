import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TorneoService } from '../../servizi/torneo.service';
import { SessionService } from '../../servizi/session.service';
import { Torneo } from '../../modelli/torneo.model';

@Component({
  selector: 'app-lista-tornei',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista-tornei.component.html',
  styleUrl: './lista-tornei.component.css'
})
export class ListaTorneiComponent implements OnInit {
  tornei: Torneo[] = [];
  torneiVisualizzati: Torneo[] = [];
  isAdmin: boolean = false;
  filtroCategoria: string = '';
  filtroPartite: string = '';

  constructor(
    private torneoService: TorneoService, private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.sessionService.isAdmin();
    this.caricaTornei();
  }

  caricaTornei(): void {
    this.torneoService.getAll().subscribe({
      next: (data) => {
        this.tornei = data;
        this.torneiVisualizzati = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei tornei:', err);
      }
    });
  }

  visualizzaRisultati(torneoId: number): void {
    this.router.navigate(['/tornei', torneoId, 'risultati']);
  }

  modificaTorneo(event: Event, torneoId: number): void {
    event.stopPropagation();
    this.router.navigate(['/tornei/modifica', torneoId]);
  }

  applicaFiltri(): void {
    this.torneiVisualizzati = this.tornei.filter(torneo => {
      
      // 1. Controllo Categoria
      if (this.filtroCategoria !== '' && torneo.Categoria !== this.filtroCategoria) {
        return false; // Categoria non corrisponde, escludi questo torneo
      }
      
      // 2. Controllo Numero Partite
      if (this.filtroPartite === '1-3') {
        if (torneo.Numero_partite < 1 || torneo.Numero_partite > 3) {
          return false; // Fuori dall'intervallo 1-3
        }
      } else if (this.filtroPartite === '4-6') {
        if (torneo.Numero_partite < 4 || torneo.Numero_partite > 6) {
          return false; // Fuori dall'intervallo 4-6
        }
      } else if (this.filtroPartite === '7+') {
        if (torneo.Numero_partite < 7) {
          return false; // Meno di 7 partite
        }
      }
      
      // Se passa tutti i controlli
      return true;
    });
  }
}
