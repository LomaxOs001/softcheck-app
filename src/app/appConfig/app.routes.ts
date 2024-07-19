import { Routes } from '@angular/router';
import { AppComponent } from '../components/home/app.component';
import { RootComponent } from '../components/root/root.component';
import { AuthComponent } from '../components/auth/auth.component';
import { ProducersComponent } from '../components/producers/producers.component';
import { DataManagementComponent } from '../components/data.management/data.management.component';
import { ConsumersComponent } from '../components/consumers/consumers.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch : 'full'},
    {path:'home', component: AppComponent, title: 'Home'},
    { path: 'authentication', component: AuthComponent, title: 'auth' },
    {path: 'producers', component: ProducersComponent, title: 'Producer'},
    {path: 'consumers', component: ConsumersComponent, title: 'Consumer'},
    { path: 'datamanage', component: DataManagementComponent, title: 'data' },
];
