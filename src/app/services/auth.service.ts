import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationResponse } from '../auth/login/authentication-response.payload';
import { LoginRequest } from '../auth/login/login-request.payload';
import { SignupRequestPayload } from '../auth/signup/signup-request.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private http:HttpClient) { }

  singup(singupPayload:SignupRequestPayload):Observable<any>{
   return this.http.post('http://localhost:8080/api/auth/signup',singupPayload,{responseType: 'text'});
  }

  login(loginRequest:LoginRequest){
    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/auth/login',loginRequest)
  }


  refreshToken() {
    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/auth/refresh-token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        window.localStorage.setItem('authenticationToken', response.authenticationToken);
        window.localStorage.setItem('date', response.expiresAt.toString());
      }));
  }

  getJwtToken() {
    return window.localStorage.getItem('authenticationToken');
  }

  getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }

  getUserName() {
    return window.localStorage.getItem('userName');
  }

  getExpirationTime() {
    return window.localStorage.getItem('date');
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }


  logout() {
    this.http.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
      window.localStorage.clear()
  }

}
