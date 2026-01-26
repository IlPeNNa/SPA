import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';
import { Atleta } from '../../modelli/atleta.model';

@Component({
  selector: 'app-lista-atleti',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-atleti.component.html',
  styleUrls: ['./lista-atleti.component.css']
})
export class ListaAtletiComponent implements OnInit {
  atleti: Atleta[] = [];
  errore: string = '';
  isAdmin: boolean = false;
  colonnaOrdinamento: string = '';
  ordineAscendente: boolean = true;

  constructor(
    private atletaService: AtletaService, private sessionService: SessionService, private router: Router) {}

  ngOnInit() {
    this.isAdmin = this.sessionService.isAdmin();
    this.caricaAtleti();
  }

  ordinaPer(colonna: string) {
    // Se clicco la stessa colonna, inverto l'ordine. Altrimenti, ricomincio da ascendente
    if (this.colonnaOrdinamento === colonna) {
      this.ordineAscendente = !this.ordineAscendente;
    } else {
      this.ordineAscendente = true; // Primo click sempre A-Z
    }

    this.colonnaOrdinamento = colonna;

    this.atleti.sort((a, b) => {
      let valA = a[colonna as keyof Atleta];
      let valB = b[colonna as keyof Atleta];

      if (typeof valA === 'string' && typeof valB === 'string') {
        const confronto = valA.localeCompare(valB, 'it', {
          sensitivity: 'base'
        });
      return this.ordineAscendente ? confronto : -confronto;
      }

      if (valA instanceof Date && valB instanceof Date) {
        const confronto = valA.getTime() - valB.getTime();
        return this.ordineAscendente ? confronto : -confronto;
      }

    return 0;
    
    });
  }

  caricaAtleti() {
    this.atletaService.getAllAtleti().subscribe({
      next: (atleti) => {
        this.atleti = atleti;
      },
      error: (err) => {
        this.errore = 'Errore nel caricamento degli atleti';
      }
    });
  }

  eliminaAtleta(idAtleta: number): void {
    if (confirm('Sei sicuro di voler eliminare questo atleta?')) {
      this.atletaService.delete(idAtleta).subscribe({
        next: () => {
          this.caricaAtleti(); // Ricarica la lista
        },
        error: (err) => {
          alert('Errore nell\'eliminazione dell\'atleta');
        }
      });
    }
  }
}