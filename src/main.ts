import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/appConfig/app.config';
import { RootComponent } from './app/components/root/root.component';
import { Amplify }from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
