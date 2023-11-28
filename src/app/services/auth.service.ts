import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  noLogin():Observable<boolean> {
    if(localStorage.getItem("userData")) {
      return of(true);
    }else{
      this.router.navigate(['/inicio']);
      return of(false);
    }
  }

  canEnter():Observable<boolean> {
    const adminStatus: any = JSON.parse(localStorage.getItem("userData") || "{}")[0]?.ADMIN;
    if(localStorage.getItem("userData")) {
      if(adminStatus === 3 || adminStatus === 2 || adminStatus === 1) {
        return of(true);
      }else{
        this.router.navigate(['/not-allowed']);
        return of(false);
      }
    }else{
      this.router.navigate(['/inicio']);
      return of(false);
    }
    
  }
}
