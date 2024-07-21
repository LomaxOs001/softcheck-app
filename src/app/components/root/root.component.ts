import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';
import { MyLocalStorage } from '../../services/myLocalStorage';

Amplify.configure(awsconfig);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit { 
  constructor(private router: Router, private session: MyLocalStorage) {
  }
  ngOnInit(): void {
    Hub.listen('auth', (data) => {
      const { payload } = data;
  
      if (payload.event === 'signedIn') {
        this.session.setToken();
        
        this.checkGroupTypes();
          // console.log("Signed in event: ", groups);
      }
      if (payload.event === 'signedOut') {
        this.router.navigate(['/']);
        this.session.clear();
      }
    });
  }
  //Return Amazon Cognito group belonging to current authenticated user
  async getGroups(): Promise<string[]> {
    try {
      const session = await fetchAuthSession();
      const groups = session.tokens?.accessToken?.payload["cognito:groups"] as string[];
      console.log("cognito groups: ", groups);
      return groups || [];
    } catch (error) {
      console.error("Error fetching groups: ", error);
      return [];
    }
  }
  
  async checkGroupTypes() {
    const groups = await this.getGroups();
  
    if (groups.includes("producers")) {
      //TODO:
      //call function that returns producers' data via GraphQL query
      console.log("user group type is producers");
    } else if (groups.includes("consumers")) {
      //TODO:
      //call function that returns consumers' data via GraphQL query
      console.log("user group type is consumers");
    } else {
      console.log("No user group type specified");
    }
  }
  //TODO:
  // Perform query operation to retrieve producer data
  // Perform query operation to retrieve consumer data

}