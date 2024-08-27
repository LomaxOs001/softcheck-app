import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';

Amplify.configure(awsconfig);

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {

  authzResult: string = '';
  
  constructor(public authService: AuthenticatorService) { }

  async ngOnInit() {
    if (this.authService.authStatus === 'authenticated') {
      await this.onLogin();
    }
  }

  async onLogin(): Promise<void> {
    try {
      const loginId = await this.authService.user.signInDetails?.loginId;
      this.authzResult = loginId?.substring(0, 2)?.toUpperCase() || '';
    } catch (error) {
      console.error(error);
    }
  }
}
