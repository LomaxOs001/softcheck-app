import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HeaderComponent} from '../header/header.component';
import { Amplify } from 'aws-amplify';
import { Router, RouterLink} from '@angular/router';
import { MyLocalStorage } from '../../services/myLocalStorage';
import awsconfig from '../../../aws-exports';
import { FooterComponent } from "../footer/footer.component";

//Amplify.configure(awsconfig);

/**
 * Component representing the root of application which handles landing page functionalities.
 *
 * @type Component
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AmplifyAuthenticatorModule, RouterLink, HeaderComponent, FooterComponent],
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
  onNavigateToUserPage(typeOfUser: String): void {
    
    if (typeOfUser === 'producer') {
      this.router.navigate(['/producers']);
    } else if (typeOfUser === 'consumer') {
      this.router.navigate(['/consumers']);
    } else {  
      this.router.navigate(['/']); // Route 0 to secure with Guards.
    }
  }
  }
  
