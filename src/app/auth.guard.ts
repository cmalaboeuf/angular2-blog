import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  // This maner of writing param initialize and create param router
  constructor(private router : Router) {
  }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild() {
    return this.canActivate();
  }
}