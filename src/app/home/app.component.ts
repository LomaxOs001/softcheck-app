import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { DataManagementComponent } from '../data.management/data.management.component';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmplifyAuthenticatorModule, DataManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'finchain-web-app';

  constructor(private router: Router, private auth: AuthenticatorService) {}

  ngOnInit() {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data);
      if (payload.event === 'signedIn') {
        this.router.navigate(['/datamanager']);
        console.log('User logged in');
      }
    });
  }


}
