import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Hub } from 'aws-amplify/utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit { 
  constructor() {
    Amplify.configure(awsconfig);
  }
  ngOnInit(): void {
    Hub.listen('auth', (data) => {
      const { payload } = data;

      if (payload.event === 'signedIn'){
        //TODO:
        console.log("Signed in event: ", payload.data.username);
      }
    });
    
  }

}