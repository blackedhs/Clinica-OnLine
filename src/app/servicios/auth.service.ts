import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(public fauth:AngularFireAuth) { }
  login(email,pass){
    return this.fauth.signInWithEmailAndPassword(email,pass);
  }
  register(email,pass){
    return this.fauth.createUserWithEmailAndPassword(email,pass);
  }
  logout(){
    return this.fauth.signOut();
  }
  SendVerificationMail() {
    return this.fauth.currentUser.then(user=> user.sendEmailVerification());
  }
  delete(){
    
  }
}
