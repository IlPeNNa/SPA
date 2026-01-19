import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { AtletaService } from './atleta.service';
import { Palla } from '../modelli/palla.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PallaService {
  private baseUrl = 'http://localhost:3000/api/palle';

  constructor(
    private http: HttpClient, private session: SessionService, private atletaService: AtletaService) {}

  // GET /palle/:ID_atleta - Recupera palle di un atleta
  getByAtleta(idAtleta: number): Observable<Palla[]> {
    return this.http.get<Palla[]>(`${this.baseUrl}/${idAtleta}`);
  }

  // POST /palle - Crea nuova palla
  /*create(palla: Palla): Observable<Palla> {
    return this.http.post<Palla>(this.baseUrl, palla);
  }*/

  create(palla: Omit<Palla, 'ID_palla' | 'ID_atleta'>): Observable<Palla> {
    const loggedUser = this.session.getLoggedUser();
    if (loggedUser) {
      return this.atletaService.getByUserId(loggedUser.ID_utente).pipe(
        switchMap(atleta => 
          this.http.post<Palla>(this.baseUrl, {
            ...palla,
            ID_atleta: atleta.ID_atleta,
          })
        )
      );
    } else throw new Error('Accesso senza utente loggato');
  }

  // PUT /palle/:ID_palla - Modifica palla
  update(id: number, palla: Palla): Observable<Palla> {
    return this.http.put<Palla>(`${this.baseUrl}/${id}`, palla);
  }

  // DELETE /palle/:ID_palla - Cancella palla (soft delete)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
