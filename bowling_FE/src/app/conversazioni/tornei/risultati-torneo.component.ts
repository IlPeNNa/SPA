import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../servizi/torneo.service';

interface RisultatoAtleta {
  Nome: string;
  Cognome: string;
  Totale: number;
  Media: number;
  PlusMinus: number;
  [key: string]: any; // Per i punteggi dinamici (partita_1, partita_2, ecc.)
}

@Component({
  selector: 'app-risultati-torneo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risultati-torneo.component.html',
  styleUrl: './risultati-torneo.component.css'
})

export class RisultatiTorneoComponent implements OnInit {
  risultati: RisultatoAtleta[] = [];
  numeroPartite: number = 0;
  idTorneo: number = 0;
  colonnaOrdinamento: string = '';
  ordineAscendente: boolean = true;

  constructor(
    private route: ActivatedRoute, private router: Router, private torneoService: TorneoService) {}

  ngOnInit(): void {
    // Recupera l'ID del torneo dalla route
    this.route.params.subscribe(params => {
      this.idTorneo = +params['id']; // Il + converte la stringa in numero
      this.caricaRisultati();
    });
  }

  caricaRisultati(): void {
    this.torneoService.getDettagli(this.idTorneo).subscribe({
      next: (data) => {
        this.risultati = data;
        // Calcola il numero di partite dal primo atleta
        if (this.risultati.length > 0) {
          const primoAtleta = this.risultati[0];
          // Conta quante chiavi iniziano con "partita_"
          this.numeroPartite = Object.keys(primoAtleta)
            .filter(key => key.startsWith('partita_')).length;
        }
        // Ordina per totale decrescente
        this.risultati.sort((a, b) => b.Totale - a.Totale);
      },
      error: (err) => {
        console.error('Errore nel caricamento dei risultati:', err);
      }
    });
  }

  // Restituisce il punteggio di una specifica partita per un atleta
  getPunteggioPartita(atleta: RisultatoAtleta, numeroPartita: number): number {
    return atleta[`partita_${numeroPartita}`] || 0;
  }

  // Genera un array per l'ngFor delle partite
  getNumeriPartite(): number[] {
    const arrayVuoto = new Array(this.numeroPartite);
    const risultato = [];

    for (let i = 0; i < arrayVuoto.length; i++) {
      risultato.push(i + 1);
    }

    return risultato;
  }

  // Torna alla lista dei tornei
  tornaIndietro(): void {
    this.router.navigate(['/tornei']);
  }

  ordinaPer(colonna: string): void {
    // Se clicco la stessa colonna, inverto l'ordine. Altrimenti, ricomincio da ascendente
    if (this.colonnaOrdinamento === colonna) {
      this.ordineAscendente = !this.ordineAscendente;
    } else {
      this.ordineAscendente = true; // Primo click sempre A-Z
    }

    this.colonnaOrdinamento = colonna;

    this.risultati.sort((a, b) => {
      let valA = a[colonna as keyof RisultatoAtleta];
      let valB = b[colonna as keyof RisultatoAtleta];

      if (typeof valA === 'string' && typeof valB === 'string') {
        const confronto = valA.localeCompare(valB, 'it', {
          sensitivity: 'base'
        });

      return this.ordineAscendente ? confronto : -confronto;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
      return this.ordineAscendente ? valA - valB : valB - valA;
      }

      return 0;

    });
  }
}