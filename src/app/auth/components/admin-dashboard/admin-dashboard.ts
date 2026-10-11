import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  
  seccionActiva: string = 'inicio';

  
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  nombreUsuario(): string {
    return 'Administrador';
  }

  inicialesAvatar(): string {
    return 'AD';
  }
}