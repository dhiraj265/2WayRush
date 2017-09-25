import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativeAudio } from '@ionic-native/native-audio';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Vibration } from '@ionic-native/vibration';

import { GamePage } from '../pages/game/game';
import { MenuPage } from '../pages/menu/menu';
import { GreenCarMovementDirective,BlueCarMovementDirective } from '../pages/game/car-movement.directive';
import { GreenCarPumpConstructionMovementDirective, BlueCarPumpConstructionMovementDirective } from '../pages/game/petrol_pump-construction-movement.directive';
import { GameServiceProvider } from '../providers/game-service/game-service';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MenuPage,
    GreenCarMovementDirective,
    BlueCarMovementDirective,
    GreenCarPumpConstructionMovementDirective,
    BlueCarPumpConstructionMovementDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MenuPage
  ],
  providers: [
    NativeAudio,
    NativeStorage,
    AndroidFullScreen,
    ScreenOrientation,
    Vibration,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameServiceProvider
  ]
})
export class AppModule {}
