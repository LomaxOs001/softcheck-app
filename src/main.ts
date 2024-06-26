import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/appConfig/app.config';
import { AppComponent } from './app/components/home/app.component';
import { Amplify }from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
