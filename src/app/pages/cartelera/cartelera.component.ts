import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula.model';
import { PeliculaService } from '../../core/services/pelicula.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.scss',
})
export class CarteleraComponent {
  private fb = inject(FormBuilder);

  peliculas: Pelicula[] = [];
  loading: boolean = true;
  peliculasFiltradas: any[] = [];
  horasDisponibles: string[] = [];

  filtrosForm = this.fb.group({
    titulo: [''],
    genero: [''],
    sala: [''],
    hora: [''],
  });

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.generarHoras();
    this.peliculaService.obtenerPeliculas().subscribe({
      next: (data) => {
        console.log(data);
        this.peliculas = data;
        this.peliculasFiltradas = this.peliculas;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  filtrarPeliculas() {
    const { titulo, genero, sala, hora } = this.filtrosForm.value;

    this.peliculasFiltradas = this.peliculas.filter((p) => {
      const coincideTitulo =
        !titulo || p.titulo.toLowerCase().includes(titulo.toLowerCase());
      const coincideGenero =
        !genero || p.genero.toLowerCase().includes(genero.toLowerCase());
      const coincideSala =
        !sala ||
        p.funciones?.some((f) =>
          f.salaNombre.toLowerCase().includes(sala.toLowerCase())
        );

      let coincideHora = true;
      if (hora) {
        const [hFiltro, mFiltro] = hora.split(':').map(Number);

        coincideHora =
          p.funciones?.some((f) => {
            const d = new Date(f.horaInicio);
            const h = d.getHours();
            const m = d.getMinutes();

            return h === hFiltro; // solo compara la HORA
          }) ?? false;
      }

      return coincideTitulo && coincideGenero && coincideSala && coincideHora;
    });
  }

  generarHoras() {
    this.horasDisponibles = Array.from(
      { length: 24 },
      (_, i) => i.toString().padStart(2, '0') + ':00'
    );
  }

  limpiarFiltros() {
    this.filtrosForm.reset();
    this.peliculasFiltradas = [...this.peliculas];
  }
}
