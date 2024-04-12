import { Component } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';

@Component({
  selector: 'app-data.management',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './data.management.component.html',
  styleUrl: './data.management.component.css'
})
export class DataManagementComponent {

}
