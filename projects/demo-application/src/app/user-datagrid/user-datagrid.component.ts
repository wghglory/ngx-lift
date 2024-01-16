import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ClarityModule, ClrDatagridStateInterface} from '@clr/angular';
import {AlertComponent, convertToHttpParams, dgState, PageContainerComponent} from 'clr-extension';
import {isEqual} from 'lodash-es';
import {AsyncState, createAsyncState} from 'ngx-extension';
import {BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, share, switchMap} from 'rxjs';

import {CodeBlockComponent} from '../shared/components/code-block/code-block.component';
import {User} from '../shared/models/user.model';
import {UserService} from '../shared/services/user.service';
import {highlight} from '../shared/utils/highlight.util';

@Component({
  selector: 'app-user-datagrid',
  standalone: true,
  imports: [CommonModule, RouterLink, ClarityModule, PageContainerComponent, AlertComponent, CodeBlockComponent],
  templateUrl: './user-datagrid.component.html',
  styleUrl: './user-datagrid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDatagridComponent {
  selectedItem: User | undefined;

  userService = inject(UserService);

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  private dgState$ = this.dgSource.pipe(dgState(false)); // When dgState parameter sets to false, this signifies that an API call will be executed even if the current state is identical to the previous state.

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

  html = `
<!-- angular v17+ user-datagrid.component.html -->
@if ({usersState: usersState$ | async, total: total$ | async}; as vm) {
  <button class="btn btn-outline" (click)="userService.refreshList()" [disabled]="vm.usersState?.loading">
    Refresh
  </button>

  <clr-datagrid
    class="min-h-[200px]"
    (clrDgRefresh)="refresh($event)"
    [clrDgLoading]="vm.usersState?.loading === true"
    [(clrDgSingleSelected)]="selectedItem"
  >
    <clr-dg-column [clrDgField]="'firstName'">First Name</clr-dg-column>
    <clr-dg-column [clrDgField]="'lastName'">Last Name</clr-dg-column>
    <clr-dg-column [clrDgField]="'email'">Email</clr-dg-column>
    <clr-dg-column [clrDgField]="'gender'">Gender</clr-dg-column>

    <clr-dg-placeholder>No data found</clr-dg-placeholder>

    @for (user of vm.usersState?.data; track user.id.value) {
      <clr-dg-row [clrDgItem]="user">
        <clr-dg-cell>{{ user.name.first }}</clr-dg-cell>
        <clr-dg-cell>{{ user.name.last }}</clr-dg-cell>
        <clr-dg-cell>{{ user.email }}</clr-dg-cell>
        <clr-dg-cell>{{ user.gender }}</clr-dg-cell>
      </clr-dg-row>
    }

    <clr-dg-footer>
      @if (!vm.total) {
        No items
      } @else {
        {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} of {{ vm.total }} items
      }
      <clr-dg-pagination #pagination [clrDgPageSize]="10" [clrDgTotalItems]="vm.total || 0" />
    </clr-dg-footer>
  </clr-datagrid>

  @if (vm.usersState?.error; as error) {
    <clx-alert [error]="error" class="mb-4"></clx-alert>
  }
}
  `;

  typescript = `
// user-datagrid.component.ts
export class UserDatagridComponent {
  selectedItem: User | undefined;

  userService = inject(UserService);

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  // When dgState parameter sets to false, this signifies that an API call will be executed even if the current state is identical to the previous state.
  private dgState$ = this.dgSource.pipe(dgState(false));

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
}
`;

  highlightedHtml = highlight(this.html);
  highlightedTypescript = highlight(this.typescript);

  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
