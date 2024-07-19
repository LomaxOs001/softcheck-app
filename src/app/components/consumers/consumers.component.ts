import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import {AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


@Component({
  selector: 'app-consumers',
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  templateUrl: './consumers.component.html',
  styleUrl: './consumers.component.css'
})
export class ConsumersComponent {

  constructor() {
    Amplify.configure(awsconfig)
  }

}
