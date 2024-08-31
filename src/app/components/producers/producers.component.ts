import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { AmplifyAuthenticatorModule, AuthenticatorService} from '@aws-amplify/ui-angular';
import { HeaderComponent } from '../header/header.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/productServices';
import { ProductDocuments} from '../../models/productDocuments';
import { VulnerabilityDocuments } from '../../models/vulnerabilityDocuments';
import { SeverityComponent } from '../severity/severity.component';
import { RootComponent } from '../root/root.component';

Amplify.configure(awsconfig);
@Component({
  selector: 'app-producers',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, HeaderComponent, AddproductComponent, SeverityComponent, FooterComponent],
  templateUrl: './producers.component.html',
  styleUrl: './producers.component.css'
})
export class ProducersComponent implements OnInit {

  addProductVisible: boolean = false;
  productDocs: ProductDocuments[] = [];
  productVulnerabilityState: VulnerabilityDocuments[] = [];

  constructor(public productService: ProductService, private authService: AuthenticatorService, private rootComponent: RootComponent) {}

  ngOnInit() {

    this.checkGroupTypes();

    this.productService.observeFetchedProductDocuments.subscribe(data => {
      this.productDocs = data;
    });

  }

  //fetch product items of a producer user
  async checkGroupTypes() {
    const groups = await this.rootComponent.getGroups();
    let id = '';
  
    if (groups.includes("producers")) {
      id = this.authService.user.userId;
      this.productService.fetchProductDocumentServiceById(id);
    }
    else {
      alert("Product items not found - wrong user group type!");
      return;
    }
  }
  //fetch a product's vulnerability state 
  fetchSeverityDetails(stateId: string) {
    this.productService.fetchVulnerabilityDocumentService(stateId);
  }

  openAddProductModal() {
    this.addProductVisible = true;
  }
  closeAddProductModal() {
    this.addProductVisible = false;
  }

}
