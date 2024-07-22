import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import {AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HeaderComponent } from '../header/header.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { FooterComponent } from '../footer/footer.component';

Amplify.configure(awsconfig)
@Component({
  selector: 'app-producers',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, HeaderComponent, AddproductComponent, FooterComponent],
  templateUrl: './producers.component.html',
  styleUrl: './producers.component.css'
})
export class ProducersComponent {

  displayAddNewProduct: boolean = false;

  constructor() {}

  onAddNewProduct(): void{
    this.displayAddNewProduct = true;
  }
  onCloseAddNewProduct(): void{
    this.displayAddNewProduct = false;
  }

}
