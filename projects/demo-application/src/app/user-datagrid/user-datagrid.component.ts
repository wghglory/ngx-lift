import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ClarityModule, ClrDatagridStateInterface} from '@clr/angular';
import {AlertComponent, convertToHttpParams, dgState, PageContainerComponent} from 'clr-extension';
import {isEqual} from 'lodash-es';
import {AsyncState, createAsyncState} from 'ngx-extension';
import {BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, share, switchMap} from 'rxjs';

import {User} from '../shared/models/user.model';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-user-datagrid',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent, AlertComponent],
  templateUrl: './user-datagrid.component.html',
  styleUrl: './user-datagrid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDatagridComponent {
  selectedItem: User | undefined;

  userService = inject(UserService);

  private dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  private dgState$ = this.dgBS.pipe(dgState(false)); // When the dgState parameter is set to false, it signals the execution of an API call even when the current state is identical to the previous state. Conversely, emission is suppressed when dgState is true, thanks to the application of distinctUntilChanged.

  usersState$ = combineLatest([this.dgState$, this.userService.refresh$]).pipe(
    switchMap(([state]) => {
      const params = convertToHttpParams(state);
      return this.userService.getUsers({...params, results: 10}).pipe(createAsyncState());
    }),
    share(),
  );

  total$ = this.usersState$.pipe(
    filter((state) => Boolean(state.data)),
    distinctUntilChanged<AsyncState<User[], HttpErrorResponse>>(isEqual),
    map((res) => res.data?.length),
  );

  refresh(state: ClrDatagridStateInterface) {
    this.dgBS.next(state);
  }
}
