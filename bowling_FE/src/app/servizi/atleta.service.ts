import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atleta } from '../modelli/atleta.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtletaService {
  private baseUrl = 'http://localhost:3000/api/atleti';

  constructor(private http: HttpClient) {}

  // GET /atleti - Lista tutti gli atleti
  getAll(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.baseUrl);
  }

  // GET /atleti/:ID_atleta - Ottieni atleta con statistiche
  getById(id: number): Observable<Atleta> {
    return this.http.get<Atleta>(`${this.baseUrl}/${id}`);
  }

  // POST /atleti - Crea nuovo atleta
  create(atleta: Atleta): Observable<Atleta> {
    return this.http.post<Atleta>(this.baseUrl, atleta);
  }

  // PUT /atleti/:ID_atleta - Modifica atleta
  update(id: number, atleta: Atleta): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, atleta);
  }

  // DELETE /atleti/:ID_atleta - Cancella atleta (soft delete)
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
