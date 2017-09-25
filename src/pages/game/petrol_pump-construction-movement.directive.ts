/**
 * Created by dr_n0d3 on 20/6/17.
 */
import {Directive, Renderer2, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { Events  } from 'ionic-angular';
import { GameServiceProvider } from '../../providers/game-service/game-service';

@Directive({
  selector: '[greenCarPCMovement]'
})
export class GreenCarPumpConstructionMovementDirective implements OnInit, OnDestroy {
  private nativeElement: any;
  private carElement: any;

  constructor(private el: ElementRef,
              private event: Events,
              private renderer: Renderer2,
              private gsp: GameServiceProvider
  ) {
  }

  ngOnInit() {
    this.nativeElement = this.el.nativeElement;

    this.carElement = this.nativeElement.children[0];

    this.event.subscribe('play',() => {
      this.gpcCreate();
    });

    this.event.subscribe('gpc:move',(pc) => {
      if(!this.gsp.getGameOver() && !this.gsp.getGamePaused()) {
        this.pcMove(pc);
        setTimeout(() => {
          this.gpcCreate();
        }, this.gsp.getRandomSpeed());
      }
    });
  }


  ngOnDestroy() {
    this.event.unsubscribe('gpc:move');
    this.event.unsubscribe('play');
  }

  gpcCreate(): void {
    if(!this.gsp.getGameOver() && !this.gsp.getGamePaused()) {
      let [pc, gpc, glr] = this.createPC();
      this.event.publish('gpc:move', pc);
      setTimeout(() => {
        this.event.publish('gpc:reached', gpc, glr);
      }, this.gsp.getSpeed());
    }
  }

  createPC(): any {
    let pc = this.renderer.createElement('img');
    let glr = this.gsp.getRandomBoolean();
    let gpc = this.gsp.getRandomBoolean();
    if(glr){
      this.renderer.addClass(pc,'gpcleft');
    } else {
      this.renderer.addClass(pc,'gpcright');
    }
    if(gpc){
      this.renderer.setAttribute(pc,'src','./assets/img/green_petrol_pump.png');
    } else {
      this.renderer.setAttribute(pc,'src','./assets/img/green_construction.png');
    }
    this.renderer.insertBefore(this.nativeElement,pc,this.carElement);
    return [ pc, gpc, glr ];
  }

  pcMove(pc: any): void {
   pc.animate(
     [
       {transform: "translateY(970%)"},
       {transform: "translateY(30%)"}
     ],
     {
       duration: this.gsp.getSpeed(),
       easing: 'linear'
     }
   );
   setTimeout(() => { this.renderer.removeChild(this.nativeElement,pc) },this.gsp.getSpeed()-100);
  }
}

@Directive({
  selector: '[blueCarPCMovement]'
})
export class BlueCarPumpConstructionMovementDirective implements OnInit, OnDestroy {
  private nativeElement: any;
  private carElement: any;


  constructor(private el: ElementRef,
              private event: Events,
              private renderer: Renderer2,
              private gsp: GameServiceProvider
  ) {
  }

  ngOnInit() {
    this.nativeElement = this.el.nativeElement;

    this.carElement = this.nativeElement.children[0];

    this.event.subscribe('play', () => {
      this.bpcCreate();
    });

    this.event.subscribe('bpc:move',(pc) => {
      if(!this.gsp.getGameOver() && !this.gsp.getGamePaused()) {
        this.pcMove(pc);
        setTimeout(() => {
          this.bpcCreate();
        }, this.gsp.getRandomSpeed());
      }
    });

  }

  ngOnDestroy() {
    this.event.unsubscribe('bpc:move');
    this.event.unsubscribe('play');
  }

  bpcCreate(): void {
   if(!this.gsp.getGameOver() && !this.gsp.getGamePaused()) {
     let [pc, bpc, blr] = this.createPC();
     this.event.publish('bpc:move', pc);
     setTimeout(() => {
       this.event.publish('bpc:reached', bpc, blr);
     }, this.gsp.getSpeed());
   }
  }

  createPC(): any {
    let pc = this.renderer.createElement('img');
    let blr = this.gsp.getRandomBoolean();
    let bpc = this.gsp.getRandomBoolean();
    if(blr){
      this.renderer.addClass(pc,'bpcleft');
    } else {
      this.renderer.addClass(pc,'bpcright');
    }
    if(bpc){
      this.renderer.setAttribute(pc,'src','./assets/img/blue_petrol_pump.png');
    } else {
      this.renderer.setAttribute(pc,'src','./assets/img/blue_construction.png');
    }
    this.renderer.insertBefore(this.nativeElement,pc,this.carElement);
    return [ pc, bpc, blr ];
  }

  pcMove(pc: any): void {
   pc.animate(
     [
       {transform: "translateY(30%)"},
       {transform: "translateY(970%)"}
     ],
     {
       duration: this.gsp.getSpeed(),
       easing: 'linear'
     }
   );
   setTimeout(() => { this.renderer.removeChild(this.nativeElement,pc) },this.gsp.getSpeed()-100);
  }
}
