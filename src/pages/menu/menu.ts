import { Component } from '@angular/core';
import { Events, NavController, AlertController, ToastController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { GameServiceProvider } from '../../providers/game-service/game-service';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private gsp: GameServiceProvider,
              private toastCtrl: ToastController,
              private platform: Platform,
              private event: Events
  ) {
  }

  emitNewGame(): void {
    console.log(this.gsp.getHighScore());
    this.navCtrl.push(GamePage);
  }

  emitToggleMusic(): void {
    this.gsp.toggleSoundStatus();
    this.toastCtrl.create({
      message: 'Sound :' + (this.gsp.getSoundStatus() ? 'ON' : 'OFF'),
      duration: 2000,
    }).present();
    this.event.publish('game:save',this.gsp.getHighScore(),this.gsp.getSoundStatus());
  }

  emitHelp(): void {
    this.alertCtrl.create({
      title: 'Help',
      subTitle: `Click New Game ->
       Tap to control the cars ->
       Missing petrol or colliding construction leads to game over.
      `,
      buttons: ['OK']
    }).present();
  }

  exitGame(): void {
    this.platform.exitApp();
  }

}
