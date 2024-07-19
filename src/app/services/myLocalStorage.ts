import { Injectable } from '@angular/core';
import { fetchAuthSession } from 'aws-amplify/auth';


const USER_TOKEN = 'authzUserToken';

@Injectable({
  providedIn: 'root'
})

export class MyLocalStorage  {
  constructor(){}

  public setToken(): void {
    fetchAuthSession().then(session => {

      const anAuthzToken = session.tokens?.idToken?.toString();

      if (anAuthzToken) {
        window.sessionStorage.setItem(USER_TOKEN, anAuthzToken);

        console.log("Token is stored: ", anAuthzToken);
      }
    }).catch(err => {
      console.log("Error with token: ", err);
    });
  }


  public getToken(): string | null {
    const token = window.sessionStorage.getItem(USER_TOKEN);
    return token ? token : null; 
  }

  public clear(): void {
    window.sessionStorage.clear();
  }
}
