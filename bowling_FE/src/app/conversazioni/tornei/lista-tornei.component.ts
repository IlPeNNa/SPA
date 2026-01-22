import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TorneoService } from '../../servizi/torneo.service';
import { Torneo } from '../../modelli/torneo.model';

@Component({
  selector: 'app-lista-tornei',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-tornei.component.html',
  styleUrl: './lista-tornei.component.css'
})
export class ListaTorneiComponent implements OnInit {
  tornei: Torneo[] = [];

  constructor(
    private torneoService: TorneoService, private router: Router) {}

  ngOnInit(): void {
    this.caricaTornei();
  }

  caricaTornei(): void {
    this.torneoService.getAll().subscribe({
      next: (data) => {
        this.tornei = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei tornei:', err);
      }
    });
  }

  visualizzaRisultati(torneoId: number): void {
    this.router.navigate(['/tornei', torneoId, 'risultati']);
  }
}
