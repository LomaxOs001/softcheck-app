import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
//import native DOM validation UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducersComponent } from '../producers/producers.component';
import { getProperties, uploadData } from '@aws-amplify/storage';
Amplify.configure(awsconfig);
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ProducersComponent, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})


export class AddproductComponent {
  progress: number = 0;
  inProgress: boolean = false;
    constructor(public addProduct: ProducersComponent) {}
    async onGetPro(){
      const file = 'testFile.txt';
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
    }

    //TODO:
    //Add S3 storage lib
    // 
    //
    

}
