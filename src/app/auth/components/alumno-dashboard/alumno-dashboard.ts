import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-alumno-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-dashboard.html',
  styleUrl: './alumno-dashboard.scss'
})
export class AlumnoDashboard implements OnInit {
  private alumnosService = inject(AlumnosService);

  seccionActiva: string = 'inicio';
  misCursosAlumno: any[] = [];
  cargando: boolean = true;

  ngOnInit() {
    (this.alumnosService as any).getCursosAlumno().subscribe({
      next: (data: any) => {
        this.misCursosAlumno = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar los cursos del alumno:', err);
        this.cargando = false;
      }
    });
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  nombreUsuario(): string {
    return 'Estudiante';
  }

  inicialesAvatar(): string {
    return 'AL';
  }
}