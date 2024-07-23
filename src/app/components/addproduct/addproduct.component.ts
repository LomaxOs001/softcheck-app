import { Component, OnInit } from '@angular/core';
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
  imports: [FormsModule, ReactiveFormsModule, ProducersComponent],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})


export class AddproductComponent {
    constructor(public addProduct: ProducersComponent) {
      
    }
    async onGetPro(){
      const file = 'testFile.txt';
      try {
        const result = await uploadData({
          path: ({identityId}) => `protected/${identityId}/`,
          data: file,

          options: {
            onProgress: ({ transferredBytes, totalBytes }) => {
              if (totalBytes) {
                console.log(
                  `Upload progress ${
                    Math.round((transferredBytes / totalBytes) * 100)
                  } %`
                );
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
