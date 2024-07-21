import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import {AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

Amplify.configure(awsconfig)
@Component({
  selector: 'app-producers',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, HeaderComponent,FooterComponent],
  templateUrl: './producers.component.html',
  styleUrl: './producers.component.css'
})
export class ProducersComponent {

  constructor() {
    
  }

}
