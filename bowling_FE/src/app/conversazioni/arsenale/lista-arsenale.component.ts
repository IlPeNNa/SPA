import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PallaService } from '../../servizi/palla.service';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';
import { Palla } from '../../modelli/palla.model';

@Component({
  selector: 'app-lista-arsenale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-arsenale.component.html',
  styleUrl: './lista-arsenale.component.css'
})
export class ListaArsenaleComponent implements OnInit {
  palle: Palla[] = [];
  loading: boolean = true;
  idAtleta: number | null = null;

  constructor(
    private router: Router,
    private pallaService: PallaService,
    private atletaService: AtletaService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const user = this.sessionService.getLoggedUser();
    if (!user) {
      this.router.navigate(['/home']);
      return;
    }
    this.caricaArsenale(user.ID_utente);
  }

  caricaArsenale(idUtente: number): void {
    this.loading = true;
    this.atletaService.getByUserId(idUtente).subscribe({
      next: (atleta: any) => {
        this.idAtleta = atleta.ID_atleta;
        this.pallaService.getByAtleta(atleta.ID_atleta).subscribe({
          next: (palle: Palla[]) => {
            this.palle = palle;
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Errore caricamento palle:', err);
            this.loading = false;
          }
        });
      },
      error: (err: any) => {
        console.error('Errore caricamento atleta:', err);
        this.loading = false;
      }
    });
  }

  getImageUrl(nomePalla: string): string {
    const fileName = nomePalla.replace(/ /g, '_');
    return `/images/balls/${fileName}.jpg`;
  }

  onImageError(event: any): void {
    event.target.src = '/images/balls/default.jpg';
    event.target.onerror = null;
  }

  modificaPalla(idPalla: number): void {
    this.router.navigate(['/arsenale/modifica', idPalla]);
  }

  aggiungiPalla(): void {
    this.router.navigate(['/arsenale/nuovo']);
  }

  eliminaPalla(palla: Palla): void {
    if (confirm(`Sei sicuro di voler eliminare "${palla.Nome_palla}"?`)) {
      this.pallaService.delete(palla.ID_palla).subscribe({
        next: () => {
          this.palle = this.palle.filter(p => p.ID_palla !== palla.ID_palla);
        },
        error: (err: any) => {
          console.error('Errore eliminazione palla:', err);
          alert('Errore durante l\'eliminazione della palla.');
        }
      });
    }
  }
}
