import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { Router } from '@angular/router';
import { MyLocalStorage } from '../../services/myLocalStorage';

import awsconfig from '../../../aws-exports';

Amplify.configure(awsconfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmplifyAuthenticatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'finchain-web-app';

  constructor(private router: Router) {
    
  }

  }
  
