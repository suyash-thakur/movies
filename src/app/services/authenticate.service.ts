import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public saveAuthData(token: string, expiration: string ): void {
    this.token = token;
    localStorage.setItem('token_movie', token);
    localStorage.setItem('expiration_movie', expiration);

}

public clearAuthData(): void {
    localStorage.removeItem('token_movie');
    localStorage.removeItem('expiration_movie');


}
public getAuthData(): { token: string; expirationDate: string; } {
  const token = localStorage.getItem('token_movie');
  const expirationDate = localStorage.getItem('expiration_movie');
  if (!token || !expirationDate) {
    console.error('Error Fetching Token');

    return;
  }
  return {
    token,
    expirationDate


  };
}
getToken(): string {
  return this.token;
}
autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    console.log('error');

    return;
  }
  const now = new Date();
  const datenow = now.getTime();
  const date = (new Date(authInformation.expirationDate)).getTime() ;
  const expiresIn = date - now.getTime();



  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.router.navigate(['/movies']);
  } else {
    console.log('error');
    this.router.navigate(['/login']);

  }
}
logout(): void {
  this.token = null;
  this.clearAuthData();
  this.router.navigate(['/login']);
}

}
