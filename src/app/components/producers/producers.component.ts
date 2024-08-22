import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';
import { HeaderComponent } from '../header/header.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/productServices';
import { ProductDocuments} from '../../models/productDocuments';
import { VulnerabilityDocuments } from '../../models/vulnerabilityDocuments';
import { SeverityComponent } from '../severity/severity.component';

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

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.observeFetchedProductDocuments.subscribe(data => {
      this.productDocs = data;
    });

  }

  openAddProductModal() {
    this.addProductVisible = true;
  }
  closeAddProductModal() {
    this.addProductVisible = false;
  }

  //fetch to return product's vulnerability state 
  fetchSeverityDetails(stateId: string) {
    this.productService.fetchVulnerabilityDocumentService(stateId);
  }

}
