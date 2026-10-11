import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DocentesService } from '../../services/docentes.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-docente-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docente-dashboard.html',
  styleUrl: './docente-dashboard.scss'
})
export class DocenteDashboard implements OnInit {
  private docentesService = inject(DocentesService);
  public authService = inject(AuthService);

  listaCursosDocente: any[] = [];
  cargando: boolean = true;

 
  seccionActiva: string = 'inicio';

  
  nombreUsuario = computed(() => {
    const user = this.authService.currentUserSignal();
    return user ? user.username : 'Docente';
  });

  
  inicialesAvatar = computed(() => {
    const nombre = this.nombreUsuario();
    if (!nombre) return 'DC';
    const partes = nombre.trim().split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  });

  ngOnInit() {
    (this.docentesService as any).getCursosDocente().subscribe({
      next: (data: any) => {
        this.listaCursosDocente = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar cursos del docente:', err);
        this.cargando = false;
      }
    });
  }

  
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }
}