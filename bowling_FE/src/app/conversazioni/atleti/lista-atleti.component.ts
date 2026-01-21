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

      // Converti a numero se è una stringa che rappresenta una data
      if (colonna === 'Data_nascita') {
        valA = new Date(valA).getTime() as any;
        valB = new Date(valB).getTime() as any;
      } 
      // Converti a maiuscolo se è stringa
      else if (typeof valA === 'string') {
        valA = valA.toUpperCase() as any;
        valB = (valB as string).toUpperCase() as any;
      }

      // Confronta i valori
      const risultato = valA > valB ? 1 : valA < valB ? -1 : 0;
      return this.ordineAscendente ? risultato : -risultato;
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

  visualizzaInfo(idAtleta: number): void {
    this.router.navigate(['/atleti', idAtleta]);
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