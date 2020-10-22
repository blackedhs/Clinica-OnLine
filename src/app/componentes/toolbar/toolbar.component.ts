import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'firebase';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public user:any;
  public userIsLogged= false;
  constructor(public db:DataService, public fAuth:AuthService,public router:Router) { }

  ngOnInit(): void {
    this.fAuth.fauth.onAuthStateChanged(user => {
      this.user = user;
        if (user){
          this.userIsLogged = true;
        }else{
          this.userIsLogged =false;
        }
    });
  }
  onLogout(){
    this.fAuth.logout();
  }
}
