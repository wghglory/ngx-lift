import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, PageContainerComponent, SpinnerComponent} from 'clr-extension';
import {switchMapWithAsyncState} from 'ngx-extension';
import {filter} from 'rxjs';

import {CodeBlockComponent} from '../shared/components/code-block/code-block.component';
import {UserCardComponent} from '../shared/components/user-card/user-card.component';
import {UserService} from '../shared/services/user.service';
import {highlight} from '../shared/utils/highlight.util';

@Component({
  selector: 'app-filter-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    PageContainerComponent,
    SpinnerComponent,
    AlertComponent,
    CodeBlockComponent,
    UserCardComponent,
  ],
  templateUrl: './filter-users.component.html',
  styleUrl: './filter-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterUsersComponent {
  genderControl = new FormControl('');

  searchState$ = this.genderControl.valueChanges.pipe(
    filter(Boolean),
    switchMapWithAsyncState((gender) => this.userService.getUsers({gender, results: 9})),
  );

  rawCode = `
@Component({
  template: \`<clr-radio-container clrInline>
      <label>Select Gender</label>
      <clr-radio-wrapper>
        <input type="radio" clrRadio name="gender" required value="male" [formControl]="genderControl" />
        <label>Male</label>
      </clr-radio-wrapper>
      <clr-radio-wrapper>
        <input type="radio" clrRadio name="gender" required value="female" [formControl]="genderControl" />
        <label>Female</label>
      </clr-radio-wrapper>
    </clr-radio-container>

    <div class="mt-6" *ngIf="searchState$ | async as vm">
      <clx-spinner *ngIf="vm.loading" />
      <clx-alert *ngIf="vm.error as error" [error]="error" />

      <div *ngIf="vm.data as users" class="card-grid">
        <app-user-card [user]="user" *ngFor="let user of users" />
      </div>
    </div>\`,
})
export class FilterUsersComponent {
  genderControl = new FormControl('');

  searchState$ = this.genderControl.valueChanges.pipe(
    filter(Boolean),
    switchMapWithAsyncState((gender) => this.userService.getUsers({gender, results: 9})),
  );

  private userService = inject(UserService);
}`;

  exampleCode = highlight(this.rawCode);

  private userService = inject(UserService);
}
