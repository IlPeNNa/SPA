import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utente } from '../modelli/utente.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersUrl = 'http://localhost:3000/api/utenti';

  constructor(private http: HttpClient) {}

  getUserById(ID_utente: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.usersUrl}/${ID_utente}`);
  }

  getUserByUsername(Username: string): Observable<Utente[]> {
    return this.http.get<Utente[]>(`${this.usersUrl}?username=${Username}`);
  }
}