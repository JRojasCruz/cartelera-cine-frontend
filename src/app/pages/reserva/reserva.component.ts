import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Funcion } from '../../core/models/pelicula.model';
import { ReservaService } from '../../core/services/reserva.service';
import { FuncionService } from '../../core/services/funcion.service';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
})
export class ReservaComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private funcionService = inject(FuncionService);
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

  reservaForm!: FormGroup;
  funcionId!: number;
  peliculaId!: number;
  funcion?: Funcion;
  enviado: boolean = false;
  error?: string;
  reservaConfirmada?: any;

  ngOnInit(): void {
    this.funcionId = Number(this.route.snapshot.paramMap.get('funcionId'));

    this.funcionService.obtenerPorId(this.funcionId).subscribe({
      next: (f) => {
        this.funcion = f;
        this.peliculaId = f.peliculaId;
      },
      error: (err) => (this.error = err),
    });

    this.reservaForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  reservar() {
    if (this.reservaForm.invalid) return;

    const reserva = {
      ...this.reservaForm.value,
      funcionId: this.funcionId,
    };

    this.reservaService.crearReserva(reserva).subscribe({
      next: (reserva) => {
        this.reservaConfirmada = reserva;
        this.enviado = true;
        this.reservaForm.reset();
        setTimeout(() => {
          if (this.modalRef?.nativeElement) {
            this.modalRef.nativeElement.showModal();
          }
        }, 0);
      },
      error: (err) => (console.log(err.error), (this.error = err.error)),
    });
  }

  cerrarModal() {
    this.modalRef.nativeElement.close();
    this.reservaConfirmada = undefined;
    this.enviado = false;
  }
}
