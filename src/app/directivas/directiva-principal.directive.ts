import {Directive, Renderer2, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDirectivaPrincipal]'
})
export class DirectivaPrincipalDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    renderer.setStyle(elementRef.nativeElement, 'font-size', '20px');
  }
}
