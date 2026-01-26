import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PallaService } from '../../servizi/palla.service';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';
import { Palla } from '../../modelli/palla.model';

@Component({
  selector: 'app-lista-arsenale',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-arsenale.component.html',
  styleUrl: './lista-arsenale.component.css'
})
export class ListaArsenaleComponent implements OnInit {
  palle: Palla[] = [];
  idAtleta: number | null = null;

  constructor(
    private router: Router, private pallaService: PallaService, private atletaService: AtletaService, private sessionService: SessionService) {}

  ngOnInit(): void {
    const user = this.sessionService.getLoggedUser();
    if (!user) {
      this.router.navigate(['/home']);
      return;
    }
    this.caricaArsenale(user.ID_utente);
  }

  caricaArsenale(idUtente: number): void {
    this.atletaService.getByUserId(idUtente).subscribe({
      next: (data) => {
        const atleti = Array.isArray(data) ? data : [data];
        if (atleti.length > 0) {
          this.idAtleta = atleti[0].ID_atleta;
          this.pallaService.getByAtleta(atleti[0].ID_atleta).subscribe({
            next: (palle: Palla[]) => {
              this.palle = palle;
            },
            error: (err) => {
              console.error('Errore caricamento palle:', err);
            }
          });
        } else {
          console.error('Nessun atleta trovato');
        }
      },
      error: (err) => {
        console.error('Errore caricamento atleta:', err);
      }
    });
  }

  getImageUrl(nomePalla: string): string {
    const fileName = nomePalla.replace(/ /g, '_');
    return `/images/balls/${fileName}.jpg`;
  }

  onImageError(event: any): void {
    // Nascondi l'immagine se non trovata
    event.target.style.display = 'none';
    event.target.onerror = null;
  }

  eliminaPalla(palla: Palla): void {
    if (confirm(`Sei sicuro di voler eliminare "${palla.Nome_palla}"?`)) {
      this.pallaService.delete(palla.ID_palla).subscribe({
        next: () => {
          this.palle = this.palle.filter(p => p.ID_palla !== palla.ID_palla);
        },
        error: (err) => {
          console.error('Errore eliminazione palla:', err);
          alert('Errore durante l\'eliminazione della palla.');
        }
      });
    }
  }
}
