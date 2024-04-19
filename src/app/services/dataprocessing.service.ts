import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { environment } from '../environment/environment';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { catchError, finalize } from 'rxjs/operators';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"
import { fromCognitoIdentityPool  } from "@aws-sdk/credential-provider-cognito-identity";
import { MyLocalStorage } from '../services/myLocalStorage';


Amplify.configure(awsconfig);



@Injectable({
  providedIn: 'root'
})
export class DataprocessingService {

  private s3Client: S3Client;
  private apiURL = environment.finchainApp.END_POINT_URL;
  private authzUserName = new BehaviorSubject<string>('');
  private userToken: any = null;
  private logindata: any = null;
  

  constructor(private http: HttpClient) {

    this.userToken = new MyLocalStorage();
    this.logindata = { [environment.finchainApp.COGNITO_IDP_URL]: this.userToken.getToken() };

    this.s3Client = new S3Client({

      region: environment.finchainApp.REGION,

      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: environment.finchainApp.REGION }),
        logins: this.logindata,
        identityPoolId: environment.finchainApp.IDENTITY_POOL_ID,
      })
    });
  }

  uploadDocument(file: File, token: string): Observable<HttpEvent<any>> {

    const bucketName = environment.finchainApp.BUCKET_NAME;
    const key = bucketName + '/' + file.name;


    return from(this.uploadFileToS3(file, bucketName, key, token)).pipe(
      finalize(() => {
        console.log('Upload process complemt');
      }),
      catchError(error => {
        console.error('Error uploading to S3:', error);
        throw error;
      })
    );
  }

  //Upload file to S3 bucket
  private uploadFileToS3(file: File, bucketName: string, key: string, token: string): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file
    });

    return this.s3Client.send(command)
      .then(data => {
        console.log('File uploaded to S3:', data);
        this.sendMetadataToAPI(file, key, token);
        return data;
      })
      .catch(error => {
        console.error('Error during S3 upload:', error);
        throw error;
      });
  }

  //Post request to API endpoint to send metadata to the database
  private sendMetadataToAPI(file: File, key: string, token: string){

    const headers = this.setTokens(token);
    let _name = '';

    try {
       this.getAuthzUsername().subscribe(aName => {
          _name = aName;
      });
    }
    catch (error) {
      console.error('Error getting the authz username:', error);
    }

    const metadata = {
      doc_metadata: file.name+"-"+file.size+"-"+key,
      fileName: file.name,
      fileSize: file.size,
      username: _name
    };

    this.http.post(`${this.apiURL}/datamanage`, metadata, { headers }).subscribe({

      next: (response) => console.log('Metadata sent to API:', response),
      error: (error) => console.error('Error sending metadata to API:', error)
    });
  }
    
  //Get request to API endpoint to retrieve data from the database
  getAllDocuments(token: string): Observable<any> {
    const headers = this.setTokens(token);
    return this.http.get(`${this.apiURL}/datamanage`, { headers });
  }

  //set the token to the header value
  private setTokens(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  setAuthzUsername(username: string = ''): void {
    this.authzUserName.next(username);
  }

  private getAuthzUsername(): Observable<string> {
    return this.authzUserName.asObservable();
  }

}
