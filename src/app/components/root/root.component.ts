import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AppComponent } from '../home/app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './root.component.html'
})
export class RootComponent {
  constructor() {}
}