import { Component } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import { DataprocessingService } from '../../services/dataprocessing.service';
import { HttpClientModule } from '@angular/common/http';
import { MyLocalStorage } from '../../services/localStorageServices'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data.management',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './data.management.component.html',
  styleUrl: './data.management.component.css'
})
export class DataManagementComponent {

  file?: File;
  token: any;
  isUploadSuccessful = false;
  isUploadFailed = false;
  docInfos?: Observable<any>;
  message = '';
  
  constructor(private dataProcessingService: DataprocessingService, private sessionStorage: MyLocalStorage) {}

  selectFile(event: any): void{
    this.file = event.target.files.item(0);
  }
  getToken(): void{
    this.token = this.sessionStorage.getToken();
  }

  ngOnInit(): void {
    //this.docInfos = this.dataProcessingService.getAllDocuments(this.token);
  }


  onUpload(): void {
    if (this.file) {
      this.dataProcessingService.uploadDocument(this.file, this.token).subscribe({
        next: data => {
            this.docInfos = this.dataProcessingService.getAllDocuments(this.token);
            console.log('File is completely uploaded!');
            console.log(data);
          
        },
        error: (error: any) => {
          this.message = 'Could not upload the file!';
          console.error('There was an error!', error);
        }
    });
    }
    this.message = 'No file selected';
  }

}
