import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure(awsconfig);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit { 
  constructor() {
  }
  ngOnInit(): void {
    Hub.listen('auth', (data) => {
      const { payload } = data;

      if (payload.event === 'signedIn'){
        //TODO:
        //Verify user group type to proceed with specific actions 
        fetchAuthSession().then(session => {
          const groups = session.tokens?.accessToken?.payload["cognito:group"];

          if ((groups as string[]).includes('producers')){
            console.log("User is a producer");
          } else if ((groups as string[]).includes('consumers')){
            console.log("User is a consumer");
          
          }
        }).catch(err => {
          console.log("Error with accessing cognito group: ", err);
        }); 
           
        //Send API request to AWS GraphQL server to get 
        //console.log("Signed in event: ", groups);
      }
    });
    
  }

}