import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar
              ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn() && this.authService.dataUser().isAdmin){
      return true;
    } else {
      this.snackBar.open(`No tiene permiso para acceder a esta página`, `OK`, {
        duration: 4000, verticalPosition: 'top'
      });
      this.router.navigate(['/cursos']);
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn() && this.authService.dataUser().isAdmin){
      return true;
    } else {
      this.snackBar.open(`No tiene permiso para acceder a esta página`, `OK`, {
        duration: 4000, verticalPosition: 'top'
      });
      this.router.navigate(['/cursos']);
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn() && this.authService.dataUser().isAdmin){
      return true;
    } else {
      this.snackBar.open(`No tiene permiso para acceder a esta página`, `OK`, {
        duration: 4000, verticalPosition: 'top'
      });
      this.router.navigate(['/cursos']);
      return false;
    }
  }
}
