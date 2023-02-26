import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { alumnoEntity } from '../Interfaces/alumnointerface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) {    
  }

  create(alumno: alumnoEntity):Observable<any>{     
   return this.http.post(`${environment.url_api_usuario}/guardarAlumno`,alumno)
 }
}
