import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //Contiene ngIf, ngFor, ...
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; //Contiene ngModel per i form
import { SessionService } from './servizi/session.service'; //Servizio per la gestione della sessione utente
import { UserService } from './servizi/utente.service'; //Servizio per la gestione degli utenti
import { Utente } from './modelli/utente.model'; //Modello User

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  Username: string = '';
  Password: string = '';
  errore: string = '';
  loggedUser: Utente | null = null;

  constructor(private session: SessionService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loggedUser=this.session.getLoggedUser();
  }

  get isAtleta(): boolean {
    return this.session.isAtleta();
  }
  
  resetErrore(): void {
    this.errore = '';
  }

  login() {
    this.errore = '';
    this.userService.getUserByUsername(this.Username).subscribe({
      next: (users: Utente[]) => {
        let user:Utente=users[0];
        if (!user) {
          this.errore = 'Utente non trovato';
        } else if (user.Deleted === 'Y') {
          this.errore = 'Utente disabilitato';
        } else if (user.Password === this.Password) {
          this.session.setLoggedUser(user);
          this.loggedUser=this.session.getLoggedUser();
          this.router.navigate(['/atleti']);
        } else {
          this.errore = 'Password errata';
        }
      },
      error: () => {
        this.errore = 'Utente non trovato';
      }
    });
  }

  logout() {
    this.session.clearLoggedUser();
    this.loggedUser=this.session.getLoggedUser();
    this.router.navigate(['/home']);
  }
}
