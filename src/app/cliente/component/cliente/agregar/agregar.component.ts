import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Utils from 'src/app/helper/utils';
import { alumnoEntity } from 'src/app/Interfaces/alumnointerface';
import { AlumnoService } from 'src/app/service/alumno.service';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  [x: string]: any;
  
  public usuarioForm : FormGroup;
  
  
  constructor(private formBuilder: FormBuilder, 
    public dialogref:MatDialogRef<AgregarComponent>, private alumnoService: AlumnoService,) { }

  ngOnInit(){     
    this.SaveClien();
  }


  SaveClien(usuario?: alumnoEntity){
    this.usuarioForm = this.formBuilder.group({    
      nombre_alumno: [usuario?.nombre_completo || '', Validators.required],
      identificacion: [usuario?.identificacion || '', Validators.required],
      telefono: [usuario?.numero_telefono || '', Validators.required],
      email: [usuario?.email || '', Validators.required],
      direccion_residencia: [usuario?.direccion_residencia || '', Validators.required],
      genero: [usuario?.genero || '', Validators.required],
      numero_matricula: [usuario?.numero_matricula || '', Validators.required],
      programa: [usuario?.programa || '', Validators.required],
      nota_promedio: [usuario?.nota_promedio || '', Validators.required]
      });      
  }


  guardar(form){        
      this.alumnoService.create(form).subscribe((res: any)=>{   
        if (res != null) {
          Swal.fire({
            icon: 'success',
            title: 'Alumno guardado con éxito!',
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
    this.usuarioForm.reset();
  }
}
