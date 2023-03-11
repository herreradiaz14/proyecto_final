import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../components/auth/models/user';
import { UserService } from '../components/security/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  userService: UserService,
    private router: Router, ) { }

  public signIn(userData: User){
    localStorage.setItem('ACCESS_TOKEN', JSON.stringify(userData));
    this.userService.sendMessage(userData);
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.userService.sendMessage(null);
    this.router.navigateByUrl('/login');
  }
}