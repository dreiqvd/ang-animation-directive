/** This is a custom directive for handling animation classes
 *  from Animate.css (https://animate.style/)
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAnimate]',
  exportAs: 'appAnimate',
})
export class AnimationDirective {
  /**
   * Name of the animation to be added on the element. This is usually used for entrance
   * animations. This is optional since you might only want to use hover animation.
   */
  @Input() animation?: string;

  /**
   * Duration of the animation. This is also the duration when the animation class will be removed from the element
   * P.S. Animation classes are removed from the element after a certain duration to avoid conflicts with other
   * animations.
   * Ref: https://animate.style/#javascript
   */
  @Input() animationDuration: number = 2;

  /**
   * Animation speed (optional)
   * Ref: https://animate.style/#utilities
   */
  @Input() animationSpeed?: 'slow' | 'slower' | 'fast' | 'faster';

  /**
   * Animation delay
   * Ref: https://animate.style/#usage
   */
  @Input() animationDelay = 0;

  /**
   * The optional animation to be applied on hover. This is removed when the mouse
   * leaves the element.
   */
  @Input() hoverAnimation?: string;

  /**
   * A private property to identify if the animation is already removed.
   * This is used to prevent overlapping of hover animation with entrance animation.
   */
  private animationRemoved = false;

  constructor(public ref: ElementRef) {
    setTimeout(() => this.animate());
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.animationRemoved && this.hoverAnimation) {
      this.addClass(this.hoverAnimation);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.hoverAnimation) {
      this.removeClass(this.hoverAnimation);
    }
  }

  public animate() {
    this.ref.nativeElement.style.setProperty(
      '--animation-duration',
      `${this.animationDuration}s`
    );
    this.addClass('animated');
    if (this.animationDelay) {
      this.addClass(`delay-${this.animationDelay}s`);
    }
    this.addClass(this.animationSpeed ?? '');
    this.addClass(this.animation ?? '');
    // Remove animation class after a set duration. This is to avoid
    // conflicts with other animations that you want to add.
    setTimeout(() => {
      this.removeClass(this.animation ?? '');
      this.removeClass(this.animationSpeed ?? '');
      if (this.animationDelay) {
        this.removeClass(`delay-${this.animationDelay}s`);
      }
      this.animationRemoved = true;
    }, this.animationDuration * 1000);
  }

  public addClass(className: string): void {
    if (className) {
      this.ref.nativeElement.classList.add(`animate__${className}`);
    }
  }

  public removeClass(className: string): void {
    if (className) {
      this.ref.nativeElement.classList.remove(`animate__${className}`);
    }
  }
}
