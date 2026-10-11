import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { JwtResponse } from '../models/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// apiaca--------------------------------------------------
 private apiUrl = 'http://localhost:8080/api/auth';
//------------------------------------------------------
  currentUserSignal = signal<JwtResponse | null>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_info', JSON.stringify(response));
          this.currentUserSignal.set(response);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.currentUserSignal.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRol(): string | null {
    const user = this.getUserFromStorage();
    return user ? user.rol : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getUserFromStorage(): JwtResponse | null {
    const userStr = localStorage.getItem('user_info');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as JwtResponse;
    } catch {
      return null;
    }
  }
}