import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import {AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductDocuments } from '../../models/productDocuments';
import { ProductService } from '../../services/productServices';

Amplify.configure(awsconfig)
@Component({
  selector: 'app-consumers',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, HeaderComponent, FooterComponent],
  templateUrl: './consumers.component.html',
  styleUrl: './consumers.component.css'
})
export class ConsumersComponent {

  consumerFetchResult: ProductDocuments[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.fetchedProductsObservable.subscribe(data => {
      this.consumerFetchResult = data;
    });
  }

}
