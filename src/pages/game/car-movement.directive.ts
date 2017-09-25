/**
 * Created by dr_n0d3 on 20/6/17.
 */
import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Gesture, Events  } from 'ionic-angular';
declare var Hammer: any;

@Directive({
  selector: '[greenCarMovement]'
})
export class GreenCarMovementDirective implements OnInit, OnDestroy {
  tapGesture: Gesture;

  constructor(private el: ElementRef,private event: Events) {
  }

  ngOnInit() {
    this.tapGesture = new Gesture(this.el.nativeElement,{
      recognizers: [
        [Hammer.Press , {time: 30}]
      ]
    });
    this.tapGesture.listen();
    this.tapGesture.on('press', e => {
      console.log('From Car: '+JSON.stringify(e));
      this.event.publish('greenCarMove',e);
    })
  }

  ngOnDestroy() {
    this.tapGesture.destroy();
  }
}
@Directive({
  selector: '[blueCarMovement]'
})
export class BlueCarMovementDirective implements OnInit, OnDestroy {
  tapGesture: Gesture;

  constructor(private el: ElementRef,private event: Events) {
  }

  ngOnInit() {
    this.tapGesture = new Gesture(this.el.nativeElement,{
      recognizers: [
        [Hammer.Press , {time: 30}]
      ]
    });
    this.tapGesture.listen();
    this.tapGesture.on('press', e => {
      console.log('From Car: '+JSON.stringify(e));
      this.event.publish('blueCarMove',e);
    })
  }

  ngOnDestroy() {
    this.tapGesture.destroy();
  }
}
