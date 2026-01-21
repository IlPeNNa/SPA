import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../servizi/atleta.service';
import { SessionService } from '../../servizi/session.service';
import { Atleta } from '../../modelli/atleta.model';

@Component({
  selector: 'app-form-atleti',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-atleti.component.html',
  styleUrl: './form-atleti.component.css'
})
export class FormAtletiComponent implements OnInit {
  atleta: Partial<Atleta> = {};
  modifica = false;

  constructor(private route: ActivatedRoute, private router: Router, private atletaService: AtletaService, private sessionService: SessionService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modifica = true;
      this.atletaService.getAtletaById(+id).subscribe({
        next: (data) => {
          this.atleta = { ...data };
          if (this.atleta.Data_nascita) {
            this.atleta.Data_nascita = this.atleta.Data_nascita.toString().slice(0, 10);
          }
        },
        error: (err) => {
          console.error('Errore caricamento atleta:', err);
          alert('Errore nel caricamento dell\'atleta');
        }
      });
    }
  }

  salva() {
    const payload = this.atleta as Atleta;
    if (this.modifica && payload.ID_atleta != null) {
      this.atletaService.update(payload.ID_atleta, payload).subscribe({
        next: () => {
          this.router.navigate(['/atleti']);
        },
        error: (err) => {
          console.error('Errore aggiornamento atleta:', err);
          alert('Errore nell\'aggiornamento dell\'atleta');
        }
      });
    } else {
      this.atletaService.create(payload).subscribe({
        next: () => {
          this.router.navigate(['/atleti']);
        },
        error: (err) => {
          console.error('Errore creazione atleta:', err);
          alert('Errore nella creazione dell\'atleta');
        }
      });
    }
  }

  annulla() {
    this.router.navigate(['/atleti']);
  }
}
