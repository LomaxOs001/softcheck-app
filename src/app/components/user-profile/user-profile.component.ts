import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  
  constructor(public authService: AuthenticatorService) 
  { Amplify.configure(awsconfig);}
}
