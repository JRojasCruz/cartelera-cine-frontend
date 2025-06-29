const BASE_URL = 'https://localhost:7003/api';

export const ApiRoutes = {
  Peliculas: {
    base: `${BASE_URL}/peliculas`,
    porId: (id: number) => `${BASE_URL}/peliculas/${id}`,
  },

  Salas: {
    base: `${BASE_URL}/salas`,
    porId: (id: number) => `${BASE_URL}/salas/${id}`,
  },

  Funciones: {
    base: `${BASE_URL}/funciones`,
    porId: (id: number) => `${BASE_URL}/funciones/${id}`,
    porPelicula: (peliculaId: number) =>
      `${BASE_URL}/funciones/pelicula/${peliculaId}`,
  },

  Reservas: {
    base: `${BASE_URL}/reservas`,
    porId: (id: number) => `${BASE_URL}/reservas/${id}`,
  },
};
