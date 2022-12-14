import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebase);

// prevent executing multiple times
let appInit = false;

// do not let start AppModule before firebase
firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    appInit = true;
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  }

  appInit = true;
});
