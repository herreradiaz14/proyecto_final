import { Component, OnInit } from '@angular/core';
import { User } from "../../shared/models/user";
import { UserService } from "../../components/security/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentYear = new Date().getFullYear();
  userLoggued?: User;

  constructor(private userService: UserService, private authService: AuthService){
  }

  ngOnInit(): void{
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }
  }
}
