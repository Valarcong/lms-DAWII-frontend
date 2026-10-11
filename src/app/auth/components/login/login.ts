import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/login-request';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };

  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage.set('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.successMessage.set(`¡Bienvenido ${response.username}! Sesión iniciada como: ${response.rol}`);
        
        
        const rol = response.rol ? response.rol.toUpperCase() : '';

        setTimeout(() => {
          if (rol === 'ADMIN' || rol === 'ADMINISTRADOR') {
            this.router.navigate(['/admin-dashboard']);
          } else if (rol === 'DOCENTE') {
            this.router.navigate(['/docente-dashboard']);
          } else if (rol === 'ALUMNO') {
            this.router.navigate(['/alumno-dashboard']);
          } else {
            this.router.navigate(['/dashboard']); 
          }
        }, 1000); 
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('Credenciales incorrectas. Verifica tu usuario o clave.');
        } else {
          this.errorMessage.set('Error de conexión con el servidor Spring Boot.');
        }
      }
    });
  }
}