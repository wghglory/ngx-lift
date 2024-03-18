import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ClarityModule, ClrDatagridStateInterface} from '@clr/angular';
import {AlertComponent, CalloutComponent, convertToHttpParams, dgState, PageContainerComponent} from 'clr-extension';
import {AsyncState, isEqual, poll} from 'ngx-extension';
import {BehaviorSubject, distinctUntilChanged, filter, map} from 'rxjs';

import {CodeBlockComponent} from '../../../../shared/components/code-block/code-block.component';
import {PaginationResponse} from '../../../../shared/models/pagination.model';
import {User} from '../../../../shared/models/user.model';
import {UserService} from '../../../../shared/services/user.service';
import {highlight} from '../../../../shared/utils/highlight.util';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent, CodeBlockComponent, AlertComponent, CalloutComponent],
  templateUrl: './poll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollComponent {
  selectedItem: User | undefined;

  userService = inject(UserService);

  private dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  private dgState$ = this.dgBS.pipe(dgState(false)); // When the dgState parameter is set to false, it signals the execution of an API call even when the current state is identical to the previous state. Conversely, emission is suppressed when dgState is true, thanks to the application of distinctUntilChanged.

  usersState$ = poll({
    interval: 10000,
    apiCall: (params) => this.userService.getUsers({...params, results: 10, seed: 'abc'}),
    paramsBuilder: (dgState) => convertToHttpParams(dgState),
    trigger: this.dgState$,
  });

  total$ = this.usersState$.pipe(
    filter((state) => Boolean(state.data)),
    distinctUntilChanged<AsyncState<PaginationResponse<User>, HttpErrorResponse>>(isEqual),
    map((res) => res.data?.info?.total),
  );

  refresh(state: ClrDatagridStateInterface) {
    this.dgBS.next(state);
  }

  searchByFirstName(value: string) {
    // in real project, better implement debounce here
    const state = this.dgBS.value || {};
    const filters = state.filters || [];

    const foundFirstName = filters.some((item) => {
      if (item.property === 'firstName') {
        item.value = value;
        return true;
      }
      return false;
    });

    if (!foundFirstName) {
      filters.push({property: 'firstName', value});
    }

    this.dgBS.next({...state, filters});
  }

  simpleCode = highlight(`
import { poll } from 'ngx-extension';

// Define API call function
const fetchData = () => ajax.getJSON('https://api.example.com/data');

// Set polling options
const options = {
  interval: 5000, // Poll every 5 seconds
  apiCall: fetchData,
};

// Create the polling observable
const polling$ = poll(options);

// Subscribe to the polling observable
polling$.subscribe(data => console.log('Received data:', data));
    `);

  advancedCode = highlight(`
import {ClarityModule, ClrDatagridStateInterface} from '@clr/angular';
import {AlertComponent, convertToHttpParams, dgState, PageContainerComponent} from 'clr-extension';
import {AsyncState, isEqual, poll} from 'ngx-extension';

export class PollComponent {
  userService = inject(UserService);

  private dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  private dgState$ = this.dgBS.pipe(dgState(false));

  usersState$ = poll({
    interval: 10000,
    apiCall: (params) => this.userService.getUsers({...params, results: 10, seed: 'abc'}),
    paramsBuilder: (dgState) => convertToHttpParams(dgState), // build params for getUsers
    trigger: this.dgState$,  // datagrid filter, sort, pagination will trigger the API call
  });
}
    `);
}
