import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, PageContainerComponent, SpinnerComponent} from 'clr-extension';
import {createAsyncState} from 'ngx-extension';
import {startWith, Subject, switchMap} from 'rxjs';

import {CodeBlockComponent} from '../shared/components/code-block/code-block.component';
import {UserCardComponent} from '../shared/components/user-card/user-card.component';
import {UserService} from '../shared/services/user.service';
import {highlight} from '../shared/utils/highlight.util';

@Component({
  selector: 'app-user-card-list',
  standalone: true,
  imports: [
    CommonModule,
    ClarityModule,
    PageContainerComponent,
    CodeBlockComponent,
    SpinnerComponent,
    AlertComponent,
    UserCardComponent,
  ],
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardListComponent {
  private userService = inject(UserService);
  private refreshAction = new Subject<void>();

  usersState$ = this.refreshAction.pipe(
    startWith(undefined),
    switchMap(() =>
      this.userService.getUsers({results: 9}).pipe(
        createAsyncState({
          next: (res) => console.log(res), // success callback
          error: (error) => console.error(error), // error callback
        }),
      ),
    ),
  );

  private callbackCode = `
this.userService.getUsers().pipe(
  createAsyncState({
    next: (res) => console.log(res), // success callback
    error: (error) => console.error(error), // error callback
  }),
).subscribe();
  `;

  highlightedCallbackCode = highlight(this.callbackCode);

  private exampleCode = `
@Component({
  template: \`
    <ng-container *ngIf="usersState$ | async as usersState">
      <clx-spinner *ngIf="usersState.loading"></clx-spinner>

      <clx-alert *ngIf="usersState.error as error" [error]="error"></clx-alert>

      <div class="card-grid" *ngIf="usersState.data as users">
        <app-user-card *ngFor="let user of users; trackBy: user.id.value" [user]="user"></app-user-card>
      </div>
    </ng-container>
  \`,
})
export class UserCardListComponent {
  usersState$ = inject(UserService).getUsers({results: 9}).pipe(createAsyncState());
}
`;

  highlightedExampleCode = highlight(this.exampleCode);

  private rawAsyncStateCode = `
export interface AsyncState<T, E = HttpErrorResponse> {
  loading: boolean;
  error: E | null;
  data: T | null;
}
`;

  highlightedAsyncStateCode = highlight(this.rawAsyncStateCode);

  loadExample() {
    this.refreshAction.next();
  }
}
