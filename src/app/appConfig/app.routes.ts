import { Routes } from '@angular/router';
import { AppComponent } from '../components/home/app.component';
import { RootComponent } from '../components/root/root.component';
import { AuthComponent } from '../components/auth/auth.component';
import { DataManagementComponent } from '../components/data.management/data.management.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch : 'full'},
    {path:'home', component: AppComponent, title: 'Home'},
    { path: 'authentication', component: AuthComponent, title: 'auth' },
    { path: 'datamanage', component: DataManagementComponent, title: 'data' },
];
