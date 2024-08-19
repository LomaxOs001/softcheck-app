import { Routes } from '@angular/router';
import { AppComponent } from '../components/home/app.component';
import { ProducersComponent } from '../components/producers/producers.component';
import { ConsumersComponent } from '../components/consumers/consumers.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch : 'full'},
    {path:'home', component: AppComponent, title: 'Home'},
    {path: 'producers', component: ProducersComponent, title: 'Producer'},
    {path: 'consumers', component: ConsumersComponent, title: 'Consumer'},
   
];
