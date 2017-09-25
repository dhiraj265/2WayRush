import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';


import { MenuPage } from '../pages/menu/menu';
import { GameServiceProvider } from '../providers/game-service/game-service';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any = MenuPage;

  constructor(
    public platform: Platform,
    public gsp: GameServiceProvider,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public androidFullScreen: AndroidFullScreen,
    public screenOrientaion: ScreenOrientation,
    public nativeStorage: NativeStorage,
    public nativeAudio: NativeAudio,
    public event: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('cordova')) {

        this.nativeAudio.preloadComplex('music','assets/sounds/softmusic.mp3',0.3,1,0);

        this.event.subscribe('backmusic',(val) => {
            if(val){
              this.nativeAudio.loop('music');
            } else {
              this.nativeAudio.stop('music');
            }
        });

        this.event.subscribe('data:save',(hs,ss) => {
          this.nativeStorage.setItem('game_settings',{highScore: hs, soundStatus: ss})
            .then(
              () => console.log('Success storing data'),
              error => console.log('Error storing item'+error)
            );
        });

        this.nativeStorage.getItem('game_settings')
          .then(
            data => this.gsp.initGameService(data.highScore,data.soundStatus),
            error => this.gsp.initGameService(0,true)
          );

        this.androidFullScreen.isImmersiveModeSupported()
          .then(() => this.androidFullScreen.immersiveMode())
          .catch((error: any) => console.log(error));

        this.screenOrientaion.lock(this.screenOrientaion.ORIENTATIONS.PORTRAIT);

        this.event.publish('backmusic',this.gsp.getSoundStatus());

        this.statusBar.styleDefault();

        this.splashScreen.hide();
      }
    });
  }
}
