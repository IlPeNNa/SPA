import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Torneo } from '../modelli/torneo.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TorneoService {
  private baseUrl = 'http://localhost:3000/api/tornei';

  constructor(private http: HttpClient) {}

  // GET /tornei - Lista tutti i tornei
  getAll(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(this.baseUrl);
  }

  // GET /tornei/:ID_torneo/dettagli - Dettagli torneo con punteggi
  getDettagli(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/dettagli`);
  }

  // POST /tornei - Crea nuovo torneo
  create(torneo: Torneo): Observable<Torneo> {
    return this.http.post<Torneo>(this.baseUrl, torneo);
  }

  // PUT /tornei/:ID_torneo - Modifica torneo
  update(id: number, torneo: Torneo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, torneo);
  }

  // DELETE /tornei/:ID_torneo - Cancella torneo (soft delete)
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
