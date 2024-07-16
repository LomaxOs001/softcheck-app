import { Component, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { DataManagementComponent } from '../data.management/data.management.component';
import { FooterComponent} from '../../modals/footer/footer.component';
import { HeaderComponent} from '../../modals/header/header.component';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MyLocalStorage } from '../../services/myLocalStorage';
import { signUp, SignUpInput } from 'aws-amplify/auth';

import awsconfig from '../../../aws-exports';
import { DataprocessingService } from '../../services/dataprocessing.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, AmplifyAuthenticatorModule, DataManagementComponent, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticatorService, private session: MyLocalStorage, private dp: DataprocessingService) {
    Amplify.configure(awsconfig);
  }

  ngOnInit() {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      
      console.log('A new auth event has happened: ', data.payload);

      if (payload.event === 'signedIn') {
        this.router.navigate(['/datamanage']);
        this.session.setToken();
        this.dp.setAuthzUsername(payload.data.username);
      }
      if (payload.event === 'signedOut') {
        this.router.navigate(['/']);
        this.session.clear();
      }
    });
  }
  services = {
    async handleSignUp(input: SignUpInput) {
      let { username, password, options } = input;
      

    }

  }

}
