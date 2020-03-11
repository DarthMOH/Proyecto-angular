import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public userName: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public auth: AngularFireAuth, private router: Router) { }

  /*user = this.auth.authState.pipe(map(authState => {
    console.log('authState: ', authState);
    if (authState) {
      return authState;
    } else {
      return null;
    }

  }));*/

  glogin() {
    console.log('google login!');
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        console.log('user logueado con google: ', user.user.displayName);
        this.userName = user.user.displayName;
        this.router.navigate(['intermedio']);
      })
      .catch(error => {
        console.log('error en google login: ', error);
      });
  }

  logout() {
    console.log('logout!');
    this.auth.auth.signOut();
  }

}
