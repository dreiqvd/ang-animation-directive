import { NgModule } from '@angular/core';

import { AnimationDirective } from './animations.directive';

@NgModule({
  declarations: [AnimationDirective],
  exports: [AnimationDirective]
})
export class AnimationDirectiveModule { }
