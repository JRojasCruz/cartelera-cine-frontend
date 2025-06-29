import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';
import { ApiRoutes } from '../constants/api.route';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(ApiRoutes.Peliculas.base);
  }

  obtenerPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(ApiRoutes.Peliculas.porId(id));
  }
}
