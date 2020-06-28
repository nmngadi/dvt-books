import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (!!this.auth.userProfileData[environment.nameSpace] && this.auth.userProfileData[environment.nameSpace].includes('admin')) {
      this.auth.isAdmin = true;
      return true;

    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}
