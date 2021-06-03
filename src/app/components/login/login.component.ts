import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  itemsCollection: AngularFirestoreCollection | undefined;
  isLoggedIn = false;
  constructor(private auth: AuthService, private fs: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.fs.getStatus();
    
  }

  login(email:string,password:string){
    this.auth.signin(email,password).then(res =>{
      // console.log(res.user?.uid);
      // this.isLoggedIn = true;
      // localStorage.setItem('user',JSON.stringify(res.user))
      // this.fs.getAuth().get().subscribe(snapshot =>{
      //   snapshot.docs.forEach(docs =>{
      //     // console.log(docs.id);
      //     let value :any = docs.data();
      //     if(res.user?.uid === docs.id){
      //       console.log();
      //       this.fs.getProfile(value['access']);
      //       this.router.navigateByUrl(value['access']);
            // this.fs.getStatus();
    })
    
  }
}


