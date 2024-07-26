import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
//import native DOM validation UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducersComponent } from '../producers/producers.component';
import { aProduct, Products } from '../../classes/products';


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
    date: new Date(),
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
      const prod = new Products();

      if (this.isValidDataType(this.product.data.name)){

        try {
          this.uploadedProductPath = await prod.uploadNewProduct(this.product);
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
      '.xml', '.gradle', '.kts', //Java
      '.txt', '.toml', '.lock', '.yml', //Python
      '.json', //Node.js/Angular/TypeScript
      '.csproj', '.fsproj', '.vbproj', '.config', '.nuspec' //C#
  ];

  const fileExtensions = dataType.substring(dataType.lastIndexOf('.'));

  return allowedExtensions.includes(fileExtensions);
  }
    
      
    /*const file = 'testFile.txt';
      
    try {  
      const result = await uploadData({  
        path: ({identityId}) => `public/${identityId}/${file}`, 
        data: file,

        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              this.progress = Math.round((transferredBytes / totalBytes) * 100);
              this.inProgress = true;
                
            }
          }
        }
      }).result;
        console.log('File Properties ', result);
      } catch (error) {
        console.log('Error ', error);
      }
    }*/

    //TODO:
    //Add S3 storage lib
    // 
    //
    

}
