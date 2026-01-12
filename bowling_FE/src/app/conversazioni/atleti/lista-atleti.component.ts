import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtletaService } from '../../servizi/atleta.service';
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
  loading: boolean = true;
  errore: string = '';

  constructor(private atletaService: AtletaService) {}

  ngOnInit(): void {
    this.caricaAtleti();
  }

  caricaAtleti(): void {
    this.loading = true;
    this.errore = '';
    this.atletaService.getAll().subscribe({
      next: (data) => {
        this.atleti = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento degli atleti:', err);
        this.errore = 'Impossibile caricare gli atleti';
        this.loading = false;
      }
    });
  }

  eliminaAtleta(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo atleta?')) {
      this.atletaService.delete(id).subscribe({
        next: () => {
          this.caricaAtleti(); // Ricarica la lista
        },
        error: (err) => {
          console.error('Errore nell\'eliminazione:', err);
          alert('Errore nell\'eliminazione dell\'atleta');
        }
      });
    }
  }
}
