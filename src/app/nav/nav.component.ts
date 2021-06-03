import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,DoCheck {

  constructor(private fireAuth: AuthService) { }

  ngDoCheck() {
    // throw new Error('Method not implemented.');
    if(sessionStorage.getItem('user')){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  isLoggedIn = false;


  ngOnInit(): void {
  }

  logout(){
    this.fireAuth.logout();
    this.isLoggedIn = false;
  }

}
