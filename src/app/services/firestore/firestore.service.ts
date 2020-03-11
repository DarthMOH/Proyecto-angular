import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';@Injectable({
  providedIn: 'root'
})
export class FirestoreService {  constructor(
  private firestore: AngularFirestore
) {}
  public createMesa(data: {mesa: string, tipo: string, persona: string}) {
    return this.firestore.collection('mesa').add(data);
  }
  public getMesa(documentId: string) {
    return this.firestore.collection('mesa').doc(documentId).snapshotChanges();
  }
  public getMesas() {
    return this.firestore.collection('mesa').snapshotChanges();
  }
  public updateMesa(documentId: string, data: any) {
    return this.firestore.collection('mesa').doc(documentId).set(data);
  }
  public deleteMesa(documentId: string) {
    return this.firestore.collection('mesa').doc(documentId).delete();
  }

  public createPersonal(data: {nombre: string, apellidos: string, edad: string, DNI: string, email: string}) {
    return this.firestore.collection('personal').add(data);
  }
  public getPersona(documentId: string) {
    return this.firestore.collection('personal').doc(documentId).snapshotChanges();
  }
  public getPersonas() {
    return this.firestore.collection('personal').snapshotChanges();
  }
  public updatePersona(documentId: string, data: any) {
    return this.firestore.collection('personal').doc(documentId).set(data);
  }
  public deletePersona(documentId: string) {
    return this.firestore.collection('personal').doc(documentId).delete();
  }
}
