import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';
import { RootComponent } from '../root/root.component';
import { HeaderComponent } from '../header/header.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/productServices';
import { ProductDocuments} from '../../models/productDocuments';

Amplify.configure(awsconfig);
@Component({
  selector: 'app-producers',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, HeaderComponent, AddproductComponent, FooterComponent],
  templateUrl: './producers.component.html',
  styleUrl: './producers.component.css'
})
export class ProducersComponent implements OnInit {

  activateNewProductForm: boolean = false;
  productDocs: ProductDocuments[] = [];
  productState: string = '';

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.fetchedProductsObservable.subscribe(data => {
      this.productDocs = data;
    });

    //fetch to return product's vulnerability state 
    this.productService.fetchvulnerabilityObservable.subscribe(data => {
      if (data.valueOf() === false)
        this.productState = 'failed';
      else
        this.productState = 'passed';
    });
  }

  openAddNewProductForm(): void{
    this.activateNewProductForm = true;
  }
  closeAddProductForm(): void{
    this.activateNewProductForm = false;
  }

}
