import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
//import native DOM validation UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducersComponent } from '../producers/producers.component';
import { aProduct, ProductManagement } from '../../classes/productManagement';

import { createProduct } from '../../../graphql/mutations';
import { generateClient } from '@aws-amplify/api';
import { v4 as uuidv4 } from 'uuid';



Amplify.configure(awsconfig);
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ProducersComponent, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})


export class AddproductComponent {
  product: aProduct = {
    name: '',
    description: '',
    price: 0,
    data: null as unknown as File
  }
  disabledProceedBtn: boolean = false;

  uploadedProductPath: string = '';

    
  constructor(public producersItemAddProduct: ProducersComponent) {}

  //return file data from UI
  async onFileInput(event: Event): Promise<void> {
    const fileInput= event.target as HTMLInputElement;
    const fileItem = fileInput.files?.[0];

    if(fileItem) {
      this.product.data = fileItem;
      this.disabledProceedBtn = true;
    }
      
  }
    
  async proceedWithUpload() {

    if (this.isValidProduct(this.product)) {
      const prod = new ProductManagement();

      if (this.isValidDataType(this.product.data.name)){

        try {

          this.uploadedProductPath = await prod.uploadNewProduct(this.product);

          
          //TODO:
          //call the function to store this product details to the DDB 
          this.addProduct(this.uploadedProductPath);
          //call function to query Vulnerability table from DDB
          //retrieve and verify the response
            //if the product status is not 
              //set the status field to false
            //else set the status field to true
        } catch (error) {
          window.alert("Error uploading product");
        }

      } else {
          window.alert("Product data type is invalid!");
          return;
      }

    } else {
      window.alert("Product details are invalid!");
      return;
    }
  }

  private isValidProduct(product: aProduct): boolean {
    return product.name.trim() !== '' &&
           product.description.trim() !== '' &&
           product.price > 0 &&
           product.data instanceof File;
  }

  private isValidDataType(dataType: string): boolean {
    const allowedExtensions = [
      '.xml', '.gradle', '.kts','.jar', 
      '.txt', '.toml', '.lock', '.yml', 
      '.json', 
      '.csproj', '.fsproj', '.vbproj', '.config', '.nuspec' 
  ];

  const fileExtensions = dataType.substring(dataType.lastIndexOf('.'));

  return allowedExtensions.includes(fileExtensions);
  }
    //TODO:
    //add via API
    async addProduct(path: string): Promise<any> {
      const client = generateClient();

      try {
        const result = await client.graphql({
          query: createProduct,
          variables: {
            input: {
              ProductId: uuidv4(),
              Name: 'Safari',
              Description: 'La mainson du bonheur',
              Price: 50000,
              ProductKey: path
            }
          }
        })
        console.log("GraphQl result:",result);
      }
      catch (err) {
        console.error("GraphQL error:",err);
        throw new Error("Error creating product:");
        
      }
      
      
    }
    // 
    //
    

}
