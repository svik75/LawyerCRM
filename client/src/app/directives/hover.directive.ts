import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[hover]',
  exportAs: 'hover'
})
export class HoverDirective {
@HostBinding('style.background') backColor = 'white';
@HostBinding('style.color') color = 'teal';

@HostListener('mouseenter') selected() {
  this.backColor = 'teal';
  this.color = 'white';
}

@HostListener('mouseleave') unSelected() {
  this.backColor = 'white';
  this.color = 'teal';
}


  constructor() { }

}
