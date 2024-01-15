import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
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
})
export class UserCardListComponent {
  private userService = inject(UserService);
  private refreshAction = new Subject<void>();

  usersState$ = this.refreshAction.pipe(
    startWith(undefined),
    switchMap(() => this.userService.getUsers({results: 9}).pipe(createAsyncState())),
  );

  private exampleCode = `
@Component({
  template: \`
    <ng-container *ngIf="usersState$ | async as usersState">
      <ng-container *ngIf="usersState.loading">
        <clx-spinner></clx-spinner>
      </ng-container>

      <ng-container *ngIf="usersState.error as error">
        <clx-alert [error]="error"></clx-alert>
      </ng-container>

      <ng-container *ngIf="usersState.data as users">
        <div class="card-grid">
          <ng-container *ngFor="let user of users; trackBy: user.id.value">
            <app-user-card [user]="user"></app-user-card>
          </ng-container>
        </div>
      </ng-container>
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
