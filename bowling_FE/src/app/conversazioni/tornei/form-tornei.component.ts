import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TorneoService } from '../../servizi/torneo.service';
import { Torneo } from '../../modelli/torneo.model';

@Component({
  selector: 'app-form-tornei',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-tornei.component.html',
  styleUrl: './form-tornei.component.css'
})
export class FormTorneiComponent implements OnInit {
  torneo: Partial<Torneo> = {};
  modifica = false;

  constructor(private route: ActivatedRoute, private router: Router, private torneoService: TorneoService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modifica = true;
      // Recuperiamo tutti i tornei e filtriamo quello che ci serve
      this.torneoService.getAll().subscribe({
        next: (tornei) => {
          const torneoTrovato = tornei.find(t => t.ID_torneo === +id);
          if (torneoTrovato) {
            this.torneo = { ...torneoTrovato };
            if (this.torneo.Data_inizio) {
              this.torneo.Data_inizio = this.torneo.Data_inizio.toString().slice(0, 10);
            }
            if (this.torneo.Data_fine) {
              this.torneo.Data_fine = this.torneo.Data_fine.toString().slice(0, 10);
            }
          }
        },
        error: (err) => console.error('Errore caricamento torneo:', err)
      });
    }
  }

  convertiDataPerInput(data: Date | string): any {
    if (!data) return '';
    const d = new Date(data);
    const anno = d.getFullYear();
    const mese = String(d.getMonth() + 1).padStart(2, '0');
    const giorno = String(d.getDate()).padStart(2, '0');
    return `${anno}-${mese}-${giorno}`;
  }

  salva() {
    const payload = this.torneo as Torneo;
    if (this.modifica && payload.ID_torneo != null) {
      this.torneoService.update(payload.ID_torneo, payload).subscribe({
        next: () => {
          this.router.navigate(['/tornei']);
        },
        error: (err) => console.error('Errore aggiornamento torneo:', err)
      });
    } else {
      this.torneoService.create(payload).subscribe({
        next: () => {
          this.router.navigate(['/tornei']);
        },
        error: (err) => console.error('Errore creazione torneo:', err)
      });
    }
  }

  annulla() {
    this.router.navigate(['/tornei']);
  }
}
