import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession} from 'aws-amplify/auth';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MyLocalStorage } from '../../services/localStorageServices';
import { CRUDOperations } from '../../models/CRUDOperations';
import { ProductService } from '../../services/productServices';
import { ProductDocuments } from '../../models/productDocuments';

Amplify.configure(awsconfig);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './root.component.html'
})

class RootComponent implements OnInit { 

  private crud = new CRUDOperations();

  constructor(private router: Router, private session: MyLocalStorage, private authService: AuthenticatorService, private productService: ProductService) {}

  
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

    this.checkGroupTypes();
    
  }
  //Return Amazon Cognito group belonging to current authenticated user
  async getGroups(): Promise<string[]> {
    try {
      const session = await fetchAuthSession();
      const groups = session.tokens?.accessToken?.payload["cognito:groups"] as string[];
      console.log("cognito groups: ", groups);
      return groups || [];
    } catch (error) {
      console.error("Error fetching groups: ", error);
      return [];
    }
  }
  
  //verify group types to fetch either producer or consumer data
  async checkGroupTypes() {
    const groups = await this.getGroups();
    let id = '';
  
    if (groups.includes("producers")) {
 
      id = this.authService.user.userId;
      const result = await this.crud.fetchProductItemsById(id); //fetch to return producers' data via GraphQL query
      this.productService.updateProductDocumentService(result);

      console.log("Producer group type", result);

    } else if (groups.includes("consumers")) {
      
      const result = await this.crud.fetchProductItems(); //fetch to return consumers' data via GraphQL query
      this.productService.updateProductDocumentService(result);

      console.log("Consumer group type", result);      
    } else {
      console.log("No user group type specified");
    }
  }
  
}

export { RootComponent };