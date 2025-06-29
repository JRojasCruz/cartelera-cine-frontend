export interface Funcion {
  id: number;
  peliculaId: number;
  peliculaTitulo: string;
  salaId: number;
  salaNombre: string;
  horaInicio: string;
  horaFin: string;
  capacidad: number;
}

export interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  sinopsis?: string;
  duracion: number;
  imagenUrl?: string;
  funciones?: Funcion[];
}
