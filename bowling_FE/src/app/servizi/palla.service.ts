import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Palla } from '../modelli/palla.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PallaService {
  private baseUrl = 'http://localhost:3000/api/palle';

  constructor(private http: HttpClient) {}

  // GET /palle?ID_atleta=123 - Recupera palle di un atleta
  getByAtleta(idAtleta: number): Observable<Palla[]> {
    return this.http.get<Palla[]>(`${this.baseUrl}?ID_atleta=${idAtleta}`);
  }

  // POST /palle - Crea nuova palla
  create(palla: Palla): Observable<Palla> {
    return this.http.post<Palla>(this.baseUrl, palla);
  }

  // PUT /palle/:ID_palla - Modifica palla
  update(id: number, palla: Palla): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, palla);
  }

  // DELETE /palle/:ID_palla - Cancella palla (soft delete)
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
