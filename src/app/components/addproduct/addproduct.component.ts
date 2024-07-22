import { Component } from '@angular/core';
//import native DOM validation UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducersComponent } from '../producers/producers.component';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ProducersComponent],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
    constructor(public addProduct: ProducersComponent) {}

    //TODO:

}
