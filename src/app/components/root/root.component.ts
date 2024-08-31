import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Hub } from 'aws-amplify/utils';
import { MyLocalStorage } from '../../services/localStorageServices';
import { CRUDOperations } from '../../models/CRUDOperations';

Amplify.configure(awsconfig);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './root.component.html'
})

class RootComponent implements OnInit { 

  constructor(private router: Router, private session: MyLocalStorage) {}

  
  ngOnInit(): void {
    Hub.listen('auth', (data) => {
      const { payload } = data;
  
      if (payload.event === 'signedIn') {
        this.session.setToken();
      }
      if (payload.event === 'signedOut') {
        this.router.navigate(['/']);
        this.session.clear();
      }
    });
    
  }

}

export { RootComponent };
