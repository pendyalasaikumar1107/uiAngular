import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  constructor(private fireAuth: AngularFireAuth, private fs: FirestoreService, private router: Router,private ts: ToastrService) { }
  async signin(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
    //   this.isLoggedIn = true;
      this.fs.getAuth().get().subscribe(snapshot =>{
        snapshot.docs.forEach(docs =>{
          // console.log(docs.id);
          let value :any = docs.data();
          if(res.user?.uid === docs.id){
            // console.log();
            sessionStorage.setItem('user',JSON.stringify(res.user));
            this.fs.getProfile(value['access']);
            // console.log("Navigate ",value['access']);
            this.router.navigateByUrl(value['access']);
          }
        })
      })
    }).catch(err=>{this.ts.error((err.code).split('/')[1])});
  }


  async signup(email: string, password: string){
    // this.fireAuth.cre
    await this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true;
      sessionStorage.setItem('user',JSON.stringify(res.user))
    }).catch(err=>{
      this.ts.error(err.code)})
  }
  async logout(){
    await this.fireAuth.signOut()
    sessionStorage.removeItem('user');
  }
  async reset(email: string){
    await this.fireAuth.sendPasswordResetEmail(email)
    .then(()=>{
      this.ts.warning("Reset Mail sent");
    })
    .catch((err)=>{
      this.ts.error("Message: "+err.Message);
    })
  }
}
