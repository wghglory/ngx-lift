import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
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
  imports: [CommonModule, RouterLink, ClarityModule, PageContainerComponent, AlertComponent],
  templateUrl: './user-datagrid.component.html',
  styleUrl: './user-datagrid.component.scss',
})
export class UserDatagridComponent {
  selectedItem: User | undefined;

  userService = inject(UserService);

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  private dgState$ = this.dgSource.pipe(dgState());

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
    this.dgSource.next(state);
  }
}
