import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PallaService } from '../../servizi/palla.service';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';
import { Palla } from '../../modelli/palla.model';

@Component({
  selector: 'app-form-arsenale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-arsenale.component.html',
  styleUrl:'./form-arsenale.component.css'
})
export class FormArsenaleComponent implements OnInit {
  palla: Partial<Palla> = {
    Marca_palla: '',
    Nome_palla: '',
    Nucleo: 'Simmetrico', 
    Peso: 15,
    RG: 0,
    Differenziale: 0,
    PSA: null
  };
  modifica = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pallaService: PallaService,
    private atletaService: AtletaService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modifica = true;
      this.caricaPalla(+id);
    }
  }

  caricaPalla(idPalla: number): void {
    this.loading = true;
    const user = this.sessionService.getLoggedUser();
    if (!user) {
      this.router.navigate(['/home']);
      return;
    }

    this.atletaService.getByUserId(user.ID_utente).subscribe({
      next: (data: any) => {
        const atleti = Array.isArray(data) ? data : [data];
        if (atleti.length > 0) {
          const idAtleta = atleti[0].ID_atleta;
          this.pallaService.getByAtleta(idAtleta).subscribe({
            next: (palle: Palla[]) => {
              const pallaCorrente = palle.find(p => p.ID_palla === idPalla);
              if (pallaCorrente) {
                this.palla = { ...pallaCorrente };
              } else {
                alert('Palla non trovata');
                this.router.navigate(['/arsenale']);
              }
              this.loading = false;
            },
            error: (err: any) => {
              console.error('Errore caricamento palle:', err);
              this.loading = false;
              this.router.navigate(['/arsenale']);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Errore caricamento atleta:', err);
        this.loading = false;
        this.router.navigate(['/arsenale']);
      }
    });
  }

  salva(): void {
    if (this.modifica && this.palla.ID_palla) {
      this.pallaService.update(this.palla.ID_palla, this.palla as Palla).subscribe({
        next: () => {
          this.router.navigate(['/arsenale']);
        },
        error: (err: any) => {
          console.error('Errore aggiornamento palla:', err);
          alert('Errore durante il salvataggio della palla.');
        }
      });
    } else {
      this.pallaService.create(this.palla as any).subscribe({
        next: () => {
          this.router.navigate(['/arsenale']);
        },
        error: (err: any) => {
          console.error('Errore creazione palla:', err);
          alert('Errore durante la creazione della palla.');
        }
      });
    }
  }

  annulla(): void {
    this.router.navigate(['/arsenale']);
  }
}
