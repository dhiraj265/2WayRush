import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
/*
  Generated class for the GameServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GameServiceProvider {
  private static gameOver: boolean;
  private static gamePaused: boolean;
  private static speed: number;
  private static score: number;
  private static soundStatus: boolean;
  private static highScore: number;

  constructor(
    private event : Events
  ) {
  }

  initGameService(hs,ss): void {
    this.setHighScore(hs);
    this.setSoundStatus(ss);
  }


  getRandomBoolean(): boolean {
    return (Math.floor(Math.random()*10%2) == 1);
  }

  getRandomSpeed(): number {
    return (Math.floor(Math.random()*10)%3+1)*1000;
  }
  setGameOver(): void {
    GameServiceProvider.gameOver = true;
  }

  setGamePause(): void {
    GameServiceProvider.gamePaused = true;
  }

  unsetGameOver(): void {
    GameServiceProvider.gameOver = false;
  }

  unsetGamePause(): void {
    GameServiceProvider.gamePaused = false;
  }

  getGameOver(): boolean {
    return GameServiceProvider.gameOver;
  }

  getGamePaused(): boolean {
    return GameServiceProvider.gamePaused;
  }

  setSpeed(num: number): void {
    if(num==1) GameServiceProvider.speed = 2000;
    else if(num==2) GameServiceProvider.speed = 1500;
    else GameServiceProvider.speed = 1000;
  }

  getSpeed(): number {
    return GameServiceProvider.speed;
  }

  initScore(): void {
    GameServiceProvider.score = 0;
  }

  increaseScore(): void {
    GameServiceProvider.score++;
  }

  getScore(): number {
    return GameServiceProvider.score;
  }

  setSoundStatus(val: boolean): void {
    GameServiceProvider.soundStatus = val;
    this.event.publish('data:save',GameServiceProvider.highScore,GameServiceProvider.soundStatus);
    this.event.publish('backmusic',GameServiceProvider.soundStatus);
  }

  toggleSoundStatus(): void {
    this.setSoundStatus(!this.getSoundStatus());
  }

  getSoundStatus(): boolean {
    return GameServiceProvider.soundStatus;
  }

  setHighScore(num: number): void {
      GameServiceProvider.highScore = num;
      this.event.publish('data:save',GameServiceProvider.highScore,GameServiceProvider.soundStatus);
  }

  getHighScore(): number {
    return GameServiceProvider.highScore;
  }

}
