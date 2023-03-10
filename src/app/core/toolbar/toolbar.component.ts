import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/components/auth/models/user';
import { UserService } from 'src/app/components/security/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  subscription?: Subscription;
  userLoggued?: User;

  constructor(private  userService: UserService,
    private authService: AuthService){

  }

  ngOnInit(): void{
    console.log(this.authService.isLoggedIn());
    console.log(localStorage.getItem('ACCESS_TOKEN'));
    console.log(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')));
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
      console.log(this.userLoggued);
    }

    this.subscription = this.userService.onMessage().subscribe(user => {
      console.log(user, 'XDDDD');
      if (user) {
        this.userLoggued = user;
      } else {
        this.userLoggued = undefined;
      }
    });
  }
  
  cerrarSesion(){
    this.authService.logout();
  }

}
