import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../constants/api.route';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor(private http: HttpClient) {}

  crearReserva(data: any): Observable<any> {
    return this.http.post<any>(ApiRoutes.Reservas.base, data);
  }
}
