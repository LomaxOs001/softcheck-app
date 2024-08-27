import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducersComponent } from '../producers/producers.component';
import { ProductType, ProductManagement } from '../../models/productManagements';
import { CRUDOperations } from '../../models/CRUDOperations';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';



Amplify.configure(awsconfig);
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})


class AddproductComponent {

  activateProceedBtn: boolean = false;
  showQualitativeRepresentation = false;
  productPathInBucket: string = '';
  productCreationResult: string = '';
  product: ProductType = {
    name: '',
    description: '',
    price: 0,
    data: null as unknown as File
  }
  

    
  constructor(public producersComponent: ProducersComponent, private authService: AuthenticatorService, private router: Router) {}


  async handleProductInput(event: Event): Promise<void> {
    const fileInput= event.target as HTMLInputElement;
    const fileItem = fileInput.files?.[0];

    if(fileItem) {
      this.product.data = fileItem;
      this.activateProceedBtn = true;
    }
      
  }
    
  async submitProductDetails() {

    if (this.validateProductDetails(this.product)) {

      const pm = new ProductManagement();
      const crud = new CRUDOperations();
      let id = '';

      if (this.validateArtifactExtensionType(this.product.data.name)) {

        try {

          this.productPathInBucket = await pm.uploadNewProduct(this.product); //Uplaod artifact to S3

          
          if (this.authService.authStatus === 'authenticated') {
            id = this.authService.user.userId; //get this user cognito id when creating new product
            
            this.productCreationResult = await crud.createProductItemInDDB(id, this.product, this.productPathInBucket)

            //sleep for a moment to allow this process to complete

            this.producersComponent.closeAddProductModal();
          }

        }catch (error) {
          console.log(error);
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

  private validateProductDetails(product: ProductType): boolean {
    return product.name.trim() !== '' &&
           product.description.trim() !== '' &&
           product.price > 0 &&
           product.data instanceof File;
  }

  private validateArtifactExtensionType(dataType: string): boolean {
    const allowedExtensions = [
      '.xml', '.gradle', '.kts','.jar', 
      '.txt', '.toml', '.lock', '.yml', 
      '.json', 
      '.csproj', '.fsproj', '.vbproj', '.config', '.nuspec' 
  ];

    const fileExtensions = dataType.substring(dataType.lastIndexOf('.'));

    return allowedExtensions.includes(fileExtensions);
  }
}

export {AddproductComponent}
