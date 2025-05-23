import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  isLoggedIn = false;

  constructor() {
    const token = this.getToken();

    if(token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
    this.isLoggedIn = status;
  }

  setToken(token: string) {
    localStorage.setItem(constants.CURRENT_TOKEN, token);
    this.updateToken(true);
  }

  removeToken() {
    localStorage.removeItem(constants.CURRENT_TOKEN);
    this.updateToken(false);
  }

  getToken(): string | null {
    return localStorage.getItem(constants.CURRENT_TOKEN) || null;
  }

  getAuthentication() {
    return this.isAuthentication;
  }
}
