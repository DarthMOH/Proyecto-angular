import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../services/firestore/firestore.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public personal = [];

  public documentId = null;
  public currentStatus = 1;
  public newPersonalForm = new FormGroup({
    email: new FormControl('', Validators.required),
    DNI: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  public agregaVisible(v) {
    document.getElementById('formPersonal').style.visibility = v;
    // tslint:disable-next-line:triple-equals
    if (v == 'visible') {
      document.getElementById('botonAgregar').style.visibility = 'hidden';
    } else {
      document.getElementById('botonAgregar').style.visibility = 'visible';
      (document.getElementById('botonInput') as HTMLInputElement).value = 'Agregar';
    }
  }

  constructor( private firestoreService: FirestoreService ) {
    this.newPersonalForm.setValue({
      id: '',
      nombre: '',
      apellidos: '',
      edad: '',
      DNI: '',
      email: ''
    });
  }

  public newPersonal(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    // tslint:disable-next-line:triple-equals
    if (this.currentStatus == 1) {
      const data = {
        nombre: form.nombre,
        apellidos: form.apellidos,
        edad: form.edad,
        DNI: form.DNI,
        email: form.email
      }
      this.firestoreService.createPersonal(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newPersonalForm.setValue({
          id: '',
          nombre: '',
          apellidos: '',
          edad: '',
          DNI: '',
          email: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        nombre: form.nombre,
        apellidos: form.apellidos,
        edad: form.edad,
        DNI: form.DNI,
        email: form.email
      }
      this.firestoreService.updatePersona(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newPersonalForm.setValue({
          id: '',
          nombre: '',
          apellidos: '',
          edad: '',
          DNI: '',
          email: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
    this.agregaVisible('hidden');
  }

  public editPersonal(documentId) {
    const editSubscribe = this.firestoreService.getPersona(documentId).subscribe((personal) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newPersonalForm.setValue({
        id: documentId,
        // @ts-ignore
        nombre: personal.payload.data().nombre,
        // @ts-ignore
        apellidos: personal.payload.data().apellidos,
        // @ts-ignore
        edad: personal.payload.data().edad,
        // @ts-ignore
        DNI: personal.payload.data().DNI,
        // @ts-ignore
        email: personal.payload.data().email
      });
      editSubscribe.unsubscribe();
    });
    this.agregaVisible('visible');
  }

  public deletePersonal(documentId) {
    this.firestoreService.deletePersona(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.firestoreService.getPersonas().subscribe((personalSnapshot) => {
      this.personal = [];
      personalSnapshot.forEach((personalData: any) => {
        this.personal.push({
          id: personalData.payload.doc.id,
          data: personalData.payload.doc.data()
        });
      });
    });
    this.agregaVisible('hidden');
  }

}
