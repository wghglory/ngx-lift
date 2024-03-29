# Tooltip

Whether you want to display additional information, provide hints, or offer interactive content, Tooltip has got you
covered

## Features

- [x] Close Button: Allows adding a close button for complex content.
- [x] Content Interaction: Supports hover and copy actions within the content popover.
- [x] Delay Configuration: Provides options to configure delay in showing/hiding the tooltip.
- [x] Automatic Positioning: Automatically positions the tooltip for optimal visibility.
- [x] Focus Trap: Implements focus trapping to keep focus within the tooltip when open.
- [x] Click Outside Interaction: Closes the popover when clicking outside the tooltip.
- [x] Keyboard Operations: Supports keyboard operations, including escape key to close.
- [x] Dark Mode: Offers a dark mode for better visual experience.
- [] Resize/Scroll Positioning: Pending implementation for resizing, scrolling, and dynamic positioning.

## Usages

### Usage 1

```html
<span clxTooltip="This is our clxTooltip text">Hover 1</span>

<span clxTooltip clxTooltipContent="This is our clxTooltip text" [clxTooltipHideDelay]="500" [clxTooltipWidth]="100">
  Hover 2
</span>
```

### Usage 2

```html
<span
  clxTooltip
  [clxTooltipContent]="ref"
  [clxTooltipWidth]="100"
  [clxTooltipHideDelay]="2000"
  [clxTooltipPosition]="'tooltip-top-right'"
>
  Ref
</span>
<ng-template #ref> Ref template <button (click)="go()" class="btn btn-primary btn-sm">GO</button> </ng-template>
```

### Usage 3

```html
<span
  *ngIf="alertComponent"
  clxTooltip
  [clxTooltipContent]="alertComponent"
  [clxTooltipWidth]="600"
  [clxTooltipHideDelay]="2000"
>
  Component Ref
</span>
```

```typescript
export class DemoComponent {
  private appRef = inject(ApplicationRef);

  alertComponent?: ComponentRef<AlertComponent>;

  ngOnInit() {
    const environmentInjector = this.appRef.injector;
    this.alertComponent = createComponent(AlertComponent, {environmentInjector});
    this.alertComponent.setInput('content', 'i am from alert component');
    this.alertComponent.hostView.detectChanges();
  }
}
```
