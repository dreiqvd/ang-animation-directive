# Angular Animation Directive
This is a custom Angular directive for managing animation classes from the popular library, [Animate.css](https://animate.style/).
<br> Animations from animate.css (and other commonly used animation libraries) are usually triggered by adding custom classes within the element.
<br> Example:
```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
```
Aside from being tedious, this is difficult to maintain as the project gets bigger — if you need to change your animation library, you would also need to update all animation classes that you used in your component templates.
<br>
One simple solution is to implement a custom directive that will handle adding of class names within the element. Now you only need to manage element animations in a single file.

## Usage
You can download / fork this repository and copy the `src/animation-directive` folder to your application.

#### Import the directive to your module:
```typescript
@NgModule({
  imports: [
    ...
    AnimationDirectiveModule
  ],
  ...
})
```
#### Use in your templates
```html
<div class="container">
  <h1 appAnimate animation="zoomIn" hoverAnimation="tada">Hello, World!</h1>
  <p appAnimate animation="rotateIn" [animationDelay]="1"
    animationSpeed="slow" hoverAnimation="hinge">
    Hover Me!
  </p>
</div>
```

The directive is fully customizable should you wish to modify or add features.

## Running the test application
For demo, you can run this application by executing `ng serve` inside the project. <br>
**Note:** The test application runs in Angular 14.