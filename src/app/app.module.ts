import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GamesPage } from '../pages/games/games';
import { AccountPage } from '../pages/account/account';
import { RequestsPage } from '../pages/requests/requests';
import { CardGamePage } from '../pages/card-game/card-game';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { Facebook } from '@ionic-native/facebook';
import { Toast } from '@ionic-native/toast';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    GamesPage,
    AccountPage,
    RequestsPage,
    CardGamePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesPage,
    AccountPage,
    RequestsPage,
    CardGamePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    FirebaseAuthentication,
    Toast,
    NativeStorage
  ]
})
export class AppModule {}
