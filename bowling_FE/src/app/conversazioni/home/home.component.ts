import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../servizi/session.service';
import { Utente } from '../../modelli/utente.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  loggedUser: Utente | null = null;

  constructor(private session: SessionService) {}

  ngOnInit(): void {
    this.loggedUser = this.session.getLoggedUser();
  }

}