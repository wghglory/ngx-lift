/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import {PositioningTooltipDirective} from './positioning-tooltip.directive';
import {TooltipDirective} from './tooltip.directive';
import {TooltipPosition} from './tooltip.model';
import {isElementClickable, isElementInsideCollection} from './tooltip.util';

@Component({
  selector: 'cll-tooltip',
  standalone: true,
  imports: [CommonModule, A11yModule, TooltipDirective, PositioningTooltipDirective],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  private cdr = inject(ChangeDetectorRef);

  @Input() left = 0;
  @Input() top = 0;
  @Input() width?: number;
  @Input() position?: TooltipPosition;
  @Input() triggerElementHovering = true; // if the trigger element (e.g. button) is being hovered

  @Input() contentContext?: Record<string, any>;

  @Input() set content(c: string | TemplateRef<any> | ComponentRef<any>) {
    if (typeof c === 'string') {
      this.text = c;
    } else if (c instanceof TemplateRef) {
      this.text = undefined;

      // Wait for the component to add the content container
      setTimeout(() => {
        this.contentContainer?.createEmbeddedView(c, this.contentContext);
        this.cdr.detectChanges();
      });
    } else if (c instanceof ComponentRef) {
      this.text = undefined;

      // Wait for the component to add the content container
      setTimeout(() => {
        this.contentContainer?.insert(c.hostView, 0);
      });
    }
  }

  // force close is true
  @Output() closePopover = new EventEmitter<boolean>();

  @ViewChild('contentContainer', {static: false, read: ViewContainerRef})
  contentContainer?: ViewContainerRef;

  text? = '';
  showClose = true;
  tooltipHovering = false;

  private host = inject(ElementRef); // <cll-tooltip>

  // get the children of the tooltip host element
  get tooltipChildren() {
    return this.host.nativeElement.children as HTMLCollection;
  }

  // click close button should force close the tooltip immediately
  closeTooltip() {
    this.closePopover.next(true);
  }

  @HostListener('window:click', ['$event'])
  click(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Close the tooltip if the user clicks the mouse outside the tooltip or the user clicks a clickable element inside the tooltip
    if ((target && isElementClickable(target)) || !isElementInsideCollection(target, this.tooltipChildren)) {
      this.closePopover.next(true);
    }
  }

  mouseEnter(event: MouseEvent) {
    this.tooltipHovering = true;
  }

  mouseLeave(event: MouseEvent) {
    this.tooltipHovering = false;

    setTimeout(() => {
      // if mouse out and not place onto the trigger element, close the tooltip
      if (!this.triggerElementHovering) {
        this.closePopover.next(false);
      }
    }, 300);
  }

  @HostListener('body:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.closePopover.next(true);
  }
}
