import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { profesorEntity } from '../Interfaces/profesorinterface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) {    
  }

  create(profe: profesorEntity):Observable<any>{     
   return this.http.post(`${environment.url_api_usuario}/guardarProfesor`,profe)
 }
}
