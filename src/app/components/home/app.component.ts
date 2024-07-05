import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { Router, RouterLink} from '@angular/router';
import { MyLocalStorage } from '../../services/myLocalStorage';
import awsconfig from '../../../aws-exports';

//Amplify.configure(awsconfig);

/**
 * Component representing the root of application which handles landing page functionalities.
 *
 * @type Component
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AmplifyAuthenticatorModule, RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  title = 'finchain-web-app';

  /**
   * Constructor to initialize the component.
   * 
   * @param router - Router object to navigate to different routes.
   */

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }
  onNav(): void {
    this.router.navigate(['/authentication']);
  }
  }
  
