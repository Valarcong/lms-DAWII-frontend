import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private http = inject(HttpClient);
  //api
  private apiUrl = 'http://localhost:8080/api/docente/cursos';
  //-----------------------------------------------------

  getCursosDocente(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}