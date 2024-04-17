import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../appConfig/environment';

@Injectable({
  providedIn: 'root'
})
export class DataprocessingService {

  private apiURL = environment.finchainAPI.endpoint;
  
  private authzUserName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  uploadDocuments(file: File, token: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);


    try {
      this.getAuthzUsername().subscribe(username => { 
        formData.append('username', username);
      });
    }
    catch (error) {
      console.error('Error getting username: ', error);
    }

    const headers = this.setTokens(token);

    const req = new HttpRequest('POST', `${this.apiURL}/datamanage`, formData, {
      headers: headers,
      //reportProgress: true  // Enable progress tracking for file uploads
    });

    return this.http.request(req);
  }
  getAllDocuments(token: string): Observable<any> {

    const headers = this.setTokens(token);
    
    return this.http.get(`${this.apiURL}/datamanage`, { headers: headers, responseType: 'json'});
  }

  private setTokens(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  setAuthzUsername(username: string = ''): void {
    this.authzUserName.next(username);
  }

  private getAuthzUsername(): Observable<string> {
    return this.authzUserName.asObservable();
  }

}
