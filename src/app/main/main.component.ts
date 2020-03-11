import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public mesas = [];
  public personas = [];

  public documentId = null;
  public currentStatus = 1;
  public newMesaForm = new FormGroup({
    mesa: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    persona: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  public agregaVisible(v) {
    document.getElementById('formMesa').style.visibility = v;
    // tslint:disable-next-line:triple-equals
    if (v == 'visible') {
      document.getElementById('botonAgregar').style.visibility = 'hidden';
    } else {
      document.getElementById('botonAgregar').style.visibility = 'visible';
      (document.getElementById('botonInput') as HTMLInputElement).value = 'Agregar';
    }
  }

  constructor( private firestoreService: FirestoreService ) {
    this.newMesaForm.setValue({
      id: '',
      mesa: '',
      tipo: '',
      persona: ''
    });
  }

  public newMesa(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    // tslint:disable-next-line:triple-equals
    if (this.currentStatus == 1) {
      const data = {
        mesa: form.mesa,
        tipo: form.tipo,
        persona: form.persona,
      }
      this.firestoreService.createMesa(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newMesaForm.setValue({
          id: '',
          mesa: '',
          tipo: '',
          persona: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        mesa: form.mesa,
        tipo: form.tipo,
        persona: form.persona
      }
      this.firestoreService.updateMesa(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newMesaForm.setValue({
          id: '',
          mesa: '',
          tipo: '',
          persona: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
    this.agregaVisible('hidden');
  }

  public editMesa(documentId) {
    const editSubscribe = this.firestoreService.getMesa(documentId).subscribe((mesa) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newMesaForm.setValue({
        id: documentId,
        // @ts-ignore
        mesa: mesa.payload.data().mesa,
        // @ts-ignore
        tipo: mesa.payload.data().tipo,
        // @ts-ignore
        persona: mesa.payload.data().persona
      });
      editSubscribe.unsubscribe();
    });
    this.agregaVisible('visible');
  }

  public deleteMesa(documentId) {
    this.firestoreService.deleteMesa(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.firestoreService.getMesas().subscribe((mesaSnapshot) => {
      this.mesas = [];
      mesaSnapshot.forEach((MesaData: any) => {
        this.mesas.push({
          id: MesaData.payload.doc.id,
          data: MesaData.payload.doc.data()
        });
      });
    });
    // @ts-ignore
    this.firestoreService.getPersonas().subscribe((personalSnapshot) => {
      this.personas = [];
      personalSnapshot.forEach((personaData: any) => {
        this.personas.push({
          id: personaData.payload.doc.id,
          data: personaData.payload.doc.data()
        });
      });
    });
    this.agregaVisible('hidden');
  }
}
