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

Amplify.configure(awsconfig);
@Component({
  selector: 'app-producers',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, HeaderComponent, AddproductComponent, FooterComponent],
  templateUrl: './producers.component.html',
  styleUrl: './producers.component.css'
})
export class ProducersComponent implements OnInit {

  displayNewProductForm: boolean = false;
  productDocs: ProductDocuments[] = [];
  productVulnerabilityState: VulnerabilityDocuments[] = [];
  hovered: boolean = false;

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.observeFetchedProductDocuments.subscribe(data => {
      this.productDocs = data;
    });

    //fetch to return product's vulnerability state 
    this.productService.observeFetchedVulnerableDocuments.subscribe(data => {
      this.productVulnerabilityState = data
    });
  }

  openAddProductForm(): void{
    this.displayNewProductForm = true;
  }
  closeAddProductForm(): void{
    this.displayNewProductForm = false;
  }

}
