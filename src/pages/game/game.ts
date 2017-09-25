import {Component, ViewChild, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { Content, Events, AlertController, ActionSheetController, NavController, Platform } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {GameServiceProvider} from '../../providers/game-service/game-service';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'game',
  templateUrl: 'game.html',
  animations: [
    trigger('greenCar', [
      state('left', style({
        left: '5%'
      })),
      state('right', style({
        left: '25%'
      })),
      transition('left => right', [animate('400ms ease-in')]),
      transition('right => left', [animate('400ms ease-in')])
    ]),
    trigger('blueCar', [
      state('left', style({
        right: '25%'
      })),
      state('right', style({
        right: '5%'
      })),
      transition('left => right', [animate('400ms ease-in')]),
      transition('right => left', [animate('400ms ease-in')])
    ])

  ]
})
export class GamePage implements OnInit, OnDestroy, AfterViewInit {
  greenCarPosition: string = 'left';
  blueCarPosition: string = 'right';
  @ViewChild(Content) content: Content;


  constructor(private event: Events,
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController,
              private gsp: GameServiceProvider,
              private platform: Platform,
              private nativeAudio: NativeAudio,
              private vibration: Vibration
  ) { }

  ngOnInit(){
    this.nativeAudio.preloadSimple('carsound','assets/sounds/carmove.mp3');
    this.event.subscribe('game:start',() => {
      this.gsp.initScore();
      this.gsp.setSpeed(1);
      setTimeout(this.playGame(),2000);
    });

    this.event.subscribe('game:resume',() => {
      setTimeout(this.playGame(),2000);
    });

    this.event.subscribe('game:pause',() => {
      this.gamePause();
    });

    this.event.subscribe('game:over',() => {
      this.gameOver();
    });

    this.event.subscribe('greenCarMove',() => {
      this.toggleGreenCarPosition();
    });

    this.event.subscribe('blueCarMove',() => {
      this.toggleBlueCarPosition();
    });

  }

  ngAfterViewInit() {
    this.event.publish('game:start');
  }

  ngOnDestroy(){
    this.event.unsubscribe('greenCarMove');
    this.event.unsubscribe('blueCarMove');
    this.event.unsubscribe('gpc:reached');
    this.event.unsubscribe('bpc:reached');
    this.event.unsubscribe('game:start');
    this.event.unsubscribe('game:over');
    this.event.unsubscribe('game:resume');
    this.event.unsubscribe('game:pause');
  }

  gameOverAlert(subtitle: string) : void {
    let alert = this.alertCtrl.create({
      title: 'Game Over',
      subTitle: subtitle,
      buttons: [
        {
          text: 'Restart',
          handler: () => {
            this.event.publish('game:start');
          }
        },{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  pauseActionSheet(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Game Paused',
      buttons: [
        {
          text: 'Menu',
          handler: () => {
            this.navCtrl.pop();
          }
        },{
          text: 'Restart',
          handler: () => {
            this.event.publish('game:start');
          }
        },{
          text: 'Resume',
          role: 'cancel',
          handler: () => {
            this.event.publish('game:resume');
          }
        },{
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }

        }
      ]
    });
    actionSheet.present();
  }

  toggleGreenCarPosition(): void {
    this.greenCarPosition = this.greenCarPosition == 'left' ? 'right' : 'left';
  }

  toggleBlueCarPosition(): void {
    this.blueCarPosition = this.blueCarPosition == 'right' ? 'left' : 'right';
  }

  gamePause(): void {
    this.gsp.setGamePause();
    this.event.unsubscribe('gpc:reached');
    this.event.unsubscribe('bpc:reached');
    this.pauseActionSheet();
  }

  gameOver(): void {
    this.vibration.vibrate(1000);
    if(this.gsp.getScore()>this.gsp.getHighScore()) {
      this.gsp.setHighScore(this.gsp.getScore());
      this.gameOverAlert('Congrats!!! High Score :'+this.gsp.getHighScore());
    } else {
      this.gameOverAlert('Your Score : ' + this.gsp.getScore());
    }
    this.gsp.setGameOver();
    this.event.unsubscribe('gpc:reached');
    this.event.unsubscribe('bpc:reached');
  }

  emitGameOver(): void {
    this.event.publish('game:over');
  }

  emitPause(): void {
    this.event.publish('game:pause');
  }

  playGame(): void {
    this.gsp.unsetGameOver();
    this.gsp.unsetGamePause();
    this.event.publish('play');
    this.event.subscribe('gpc:reached',(gpc,glr) => {
        if (gpc) {
          if ((glr && this.greenCarPosition == 'left') || (!glr && this.greenCarPosition == 'right')) {
            this.nativeAudio.play('carsound');
            this.gsp.increaseScore();
          } else {
            this.emitGameOver();
          }
        } else {
          if ((glr && this.greenCarPosition == 'left') || (!glr && this.greenCarPosition == 'right')) {
            this.emitGameOver();
          }
        }
    });

    this.event.subscribe('bpc:reached',(bpc,blr) => {
        if(bpc){
          if((blr && this.blueCarPosition=='left') || (!blr && this.blueCarPosition=='right')){
            this.nativeAudio.play('carsound');
            this.gsp.increaseScore();
          } else {
            this.emitGameOver();
          }
        } else {
          if((blr && this.blueCarPosition=='left') || (!blr && this.blueCarPosition=='right')){
            this.emitGameOver();
          }
        }
    });
  }

}
