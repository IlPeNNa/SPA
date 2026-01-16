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
  loading: boolean = true;
  errore: string = '';
  isAdmin: boolean = false;

  constructor(
    private atletaService: AtletaService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.sessionService.isAdmin();
    this.caricaAtleti();
  }

  caricaAtleti() {
    this.loading = true;
    this.atletaService.getAllAtleti().subscribe({
      next: (atleti) => {
        this.atleti = atleti;
        this.loading = false;
      },
      error: (err) => {
        this.errore = 'Errore nel caricamento degli atleti';
        this.loading = false;
      }
    });
  }

  visualizzaInfo(idAtleta: number): void {
    this.router.navigate(['/atleti', idAtleta]);
  }

  eliminaAtleta(idAtleta: number): void {
    if (!this.isAdmin) {
      alert('Solo gli admin possono eliminare atleti');
      return;
    }

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
