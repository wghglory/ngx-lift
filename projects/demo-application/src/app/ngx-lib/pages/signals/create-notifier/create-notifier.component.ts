import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {CalloutComponent, PageContainerComponent} from 'clr-lift';
import {createNotifier} from 'ngx-lift';

import {CodeBlockComponent} from '../../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../../shared/utils/highlight.util';

@Component({
  selector: 'app-create-notifier',
  standalone: true,
  imports: [ClarityModule, PageContainerComponent, CodeBlockComponent, CalloutComponent],
  templateUrl: './create-notifier.component.html',
  styleUrl: './create-notifier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNotifierComponent {
  private refreshNotifier = createNotifier();

  constructor() {
    effect(() => {
      this.refreshNotifier.listen();

      // whatever code you want to run whenever refreshNotifier.notify() is called
      console.log('notifier effect');
    });

    effect(() => {
      if (this.refreshNotifier.listen()) {
        // Will NOT run on init
        // whatever code you want to run whenever refreshNotifier.notify() is called
        console.log('You click the button!');
      }
    });
  }

  refresh() {
    this.refreshNotifier.notify();
  }

  notifierCode = highlight(`
import {createNotifier} from 'ngx-lift';

export class CreateNotifierComponent {
  private refreshNotifier = createNotifier();

  constructor() {
    effect(() => {
      this.refreshNotifier.listen();

      // whatever code you want to run whenever refreshNotifier.notify() is called
      console.log('notifier effect');
    });

    effect(() => {
      if (this.refreshNotifier.listen()) {
        // Will NOT run on init
        // whatever code you want to run whenever refreshNotifier.notify() is called
        console.log('You click the button!');
      }
    });
  }

  // when button clicks
  refresh() {
    this.refreshNotifier.notify();
  }
}
  `);
}
