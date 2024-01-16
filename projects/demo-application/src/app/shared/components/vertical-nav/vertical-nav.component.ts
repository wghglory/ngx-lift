import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ClarityModule} from '@clr/angular';

import {clrExtensionData, ngxExtensionData} from '../../constants/route.const';
import {RouteData} from '../../models/route-data.model';

@Component({
  selector: 'app-vertical-nav',
  standalone: true,
  imports: [ClarityModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './vertical-nav.component.html',
  styleUrl: './vertical-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNavComponent implements OnInit {
  navigationData: WritableSignal<RouteData[]> = signal([]);

  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Route has changed, do something
        if (event.url.includes('/ngx-extension')) {
          this.navigationData.set(ngxExtensionData);
        } else if (event.url.includes('/clr-extension')) {
          this.navigationData.set(clrExtensionData);
        }
      }
    });
  }
}
