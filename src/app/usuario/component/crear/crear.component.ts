import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Utils from 'src/app/helper/utils';
import { profesorEntity } from 'src/app/Interfaces/profesorinterface';
import { ProfesorService } from 'src/app/service/profesor.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public profesorForm: FormGroup; 
  

  estado = ["Femenino","Masculino"];
  
  constructor( private formBuilder: FormBuilder,
    public dialogref:MatDialogRef<CrearComponent>, private profesorS: ProfesorService) { }

  ngOnInit(): void {
    this.SaveUsers();
  }  

  SaveUsers(usuario?: profesorEntity){
    this.profesorForm = this.formBuilder.group({    
      nombre_alumno: [usuario?.nombre_completo || '', Validators.required],
      identificacion: [usuario?.identificacion || '', Validators.required],
      telefono: [usuario?.numero_telefono || '', Validators.required],
      email: [usuario?.email || '', Validators.required],
      direccion_residencia: [usuario?.direccion_residencia || '', Validators.required],
      genero: [usuario?.genero || '', Validators.required],
      salario: [usuario?.salario || '', Validators.required],
      dependencia: [usuario?.dependencia || '', Validators.required],
      materia: [usuario?.materia || '', Validators.required]
      });   
  }

  guardar(form){
    this.profesorS.create(form).subscribe((res: any)=>{   
      if (res != null) {
        Swal.fire({
          icon: 'success',
          title: 'Profesor guardado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })     
        this.dialogref.close('save');    
        this.clear();         
      }
      if (res == 0) {
        Utils.mostrarAlerta('Error al ejecutar la petición', 'error');
        return;
      } 
    });     
}

clear(){
  this.profesorForm.reset();
 }
}

  