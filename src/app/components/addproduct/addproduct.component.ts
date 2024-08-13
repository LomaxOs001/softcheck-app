import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
//import native DOM validation UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducersComponent } from '../producers/producers.component';
import { Product, ProductManagement } from '../../classes/productManagement';
import { CRUDOperations } from '../../classes/CRUDOperations';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';



Amplify.configure(awsconfig);
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ProducersComponent, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})


class AddproductComponent {

  disabledProceedBtn: boolean = false;
  productPath: string = '';
  createdAt: string = '';
  product: Product = {
    name: '',
    description: '',
    price: 0,
    data: null as unknown as File
  }
  

    
  constructor(public producersComponent: ProducersComponent, private authService: AuthenticatorService, private router: Router) {}


  async onArtifactInput(event: Event): Promise<void> {
    const fileInput= event.target as HTMLInputElement;
    const fileItem = fileInput.files?.[0];

    if(fileItem) {
      this.product.data = fileItem;
      this.disabledProceedBtn = true;
    }
      
  }
    
  async onSubmitProductDetails() {

    if (this.validateProductDetails(this.product)) {

      const pm = new ProductManagement();
      const crud = new CRUDOperations();
      let id = '';

      if (this.validateArtifactExtensionType(this.product.data.name)){

        try {

          this.productPath = await pm.uploadNewProduct(this.product); //Uplaod artifact to S3

          
          if (this.authService.authStatus === 'authenticated') {
            id = this.authService.user.userId; //get this user cognito id when creating new product
            
            this.createdAt = await crud.createProductItemInDDB(this.authService.user.userId, this.product, this.productPath)

            crud.readProductItemsFromDDB(this.authService.user.userId);

            this.router.navigate(['/producers']);
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

  private validateProductDetails(product: Product): boolean {
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
