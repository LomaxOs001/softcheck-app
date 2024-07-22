import { Component } from '@angular/core';
//import native DOM validation UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
    constructor() {}

    onCloseAddProductForm(): void {
      
    }
}
