import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../constants/api.route';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  constructor(private http: HttpClient) {}

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(ApiRoutes.Funciones.porId(id));
  }
}
