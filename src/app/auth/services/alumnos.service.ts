import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http = inject(HttpClient);
  //api
  private apiUrl = 'http://localhost:8080/api/alumno/cursos';
  //-----------------------------------------------------------

  getCursosAlumno(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}