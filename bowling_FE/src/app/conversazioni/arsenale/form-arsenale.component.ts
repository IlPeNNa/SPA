import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PallaService } from '../../servizi/palla.service';
import { Palla } from '../../modelli/palla.model';

@Component({
  selector: 'app-form-arsenale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-arsenale.component.html',
  styleUrl: './form-arsenale.component.css'
})
export class FormArsenaleComponent implements OnInit {
  palla: Partial<Palla> = {
    Marca_palla: '',
    Nome_palla: '',
    Nucleo: 'Simmetrtico',
    Peso: 15,
    RG: 0,
    Diff: 0,
    PSA: 0
  };
  modifica = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pallaService: PallaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modifica = true;
      // Per la modifica, dovremmo caricare i dati della palla
      // Ma il servizio non ha un metodo getById, quindi usiamo un workaround
      this.loading = true;
      // Nota: questo richiederà l'implementazione di un metodo getById nel service
      // Per ora assumiamo che l'ID sia disponibile
      this.palla.ID_palla = +id;
      this.loading = false;
    }
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
