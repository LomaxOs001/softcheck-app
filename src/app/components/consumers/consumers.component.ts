import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import {AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductDocuments } from '../../models/productDocuments';
import { ProductService } from '../../services/productServices';
import { VulnerabilityDocuments } from '../../models/vulnerabilityDocuments';
import { SeverityComponent } from '../severity/severity.component';
import { UserServices } from '../../services/userServices';

Amplify.configure(awsconfig)
@Component({
  selector: 'app-consumers',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, HeaderComponent, FooterComponent, SeverityComponent],
  templateUrl: './consumers.component.html',
  styleUrl: './consumers.component.css'
})
class ConsumersComponent {

  showQualitativeRepresentation = false

  consumerDocs: ProductDocuments[] = [];
  productVulnerabilityState: VulnerabilityDocuments[] = [];

  constructor(public productService: ProductService, private authService: AuthenticatorService, private userService: UserServices ) {}

  ngOnInit() {

    this.checkGroupTypes();

    //pass new product documents
    this.productService.observeFetchedProductDocuments.subscribe(data => {
      this.consumerDocs = data;
    });
  }

  //ensure it's consumer group prior to fetching data
  async checkGroupTypes() {
    const groups = await this.userService.getGroups();
    let id = '';
  
    if (groups.includes("consumers")) {
      id = this.authService.user.userId;
      this.productService.fetchProductDocumentsServiceByCollection();
    }
    else {
      alert("Product items not found - wrong user group type!");
      return;
    }
  }
  //fetch to return product's vulnerability state 
  fetchSeverityDetails(stateId: string) {
    this.productService.fetchVulnerabilityDocumentService(stateId);
  }
}
export {ConsumersComponent}
