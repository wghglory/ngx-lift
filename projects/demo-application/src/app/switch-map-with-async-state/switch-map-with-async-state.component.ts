import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {PageContainerComponent} from 'clr-extension';

import {CodeBlockComponent} from '../shared/components/code-block/code-block.component';
import {FilterUsersComponent} from '../shared/components/filter-users/filter-users.component';
import {highlight} from '../shared/utils/highlight.util';

@Component({
  selector: 'app-switch-map-with-async-state',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent, CodeBlockComponent, FilterUsersComponent],
  templateUrl: './switch-map-with-async-state.component.html',
  styleUrl: './switch-map-with-async-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchMapWithAsyncStateComponent {
  exampleCode = highlight(`
@Component({
  template: \`
    <clr-radio-container clrInline>
      <label>Select Gender</label>
      <clr-radio-wrapper>
        <input type="radio" clrRadio name="gender" value="male" [formControl]="genderControl" />
        <label>Male</label>
      </clr-radio-wrapper>
      <clr-radio-wrapper>
        <input type="radio" clrRadio name="gender" value="female" [formControl]="genderControl" />
        <label>Female</label>
      </clr-radio-wrapper>
    </clr-radio-container>

    <div class="mt-6" *ngIf="searchState$ | async as vm">
      <clx-spinner *ngIf="vm.loading" />

      <clx-alert *ngIf="vm.error as error" [error]="error" />

      <div *ngIf="vm.data as users" class="card-grid">
        <app-user-card *ngFor="let user of users" [user]="user" />
      </div>
    </div>
  \`
})
export class FilterUsersComponent {
  genderControl = new FormControl('');

  searchState$ = this.genderControl.valueChanges.pipe(
    filter(Boolean),
    switchMapWithAsyncState((gender) => this.userService.getUsers({gender, results: 9})),
  );

  private userService = inject(UserService);
}
  `);
}
