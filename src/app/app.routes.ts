import { Routes } from '@angular/router';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ReservaComponent } from './pages/reserva/reserva.component';

export const routes: Routes = [
  { path: '', component: CarteleraComponent },
  { path: 'pelicula/:id', component: DetalleComponent },
  { path: 'reserva/:funcionId', component: ReservaComponent },
];
