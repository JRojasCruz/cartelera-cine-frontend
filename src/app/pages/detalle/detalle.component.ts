import { Component, inject } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeliculaService } from '../../core/services/pelicula.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss',
})
export class DetalleComponent {
  pelicula?: Pelicula;
  loading: boolean = true;

  private route = inject(ActivatedRoute);
  private peliculaService = inject(PeliculaService);

  constructor() {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.peliculaService.obtenerPorId(id).subscribe({
        next: (data) => {
          console.log(data);
          this.pelicula = data;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
    }
  }

  get tieneFunciones(): boolean {
    return !!this.pelicula?.funciones && this.pelicula.funciones.length > 0;
  }
}
