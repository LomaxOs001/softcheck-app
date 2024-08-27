import { Component } from '@angular/core';
import { UserProfileComponent } from "../user-profile/user-profile.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
