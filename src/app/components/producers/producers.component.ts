import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import {AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-producers',
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  templateUrl: './producers.component.html',
  styleUrl: './producers.component.css'
})
export class ProducersComponent {

  constructor() {
    Amplify.configure(awsconfig)
  }

}
