import { Routes } from '@angular/router';
import { AppComponent } from '../home/app.component';
import { DataManagementComponent } from '../data.management/data.management.component';

export const routes: Routes = [
    { path: 'datamanager', component: DataManagementComponent, title: 'data' },
];
