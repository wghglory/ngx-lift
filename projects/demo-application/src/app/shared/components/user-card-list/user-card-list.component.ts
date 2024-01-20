import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, SpinnerComponent} from 'clr-extension';
import {createAsyncState} from 'ngx-extension';
import {startWith, Subject, switchMap} from 'rxjs';

import {UserService} from '../../services/user.service';
import {UserCardComponent} from '../user-card/user-card.component';

@Component({
  selector: 'app-user-card-list',
  standalone: true,
  imports: [CommonModule, ClarityModule, SpinnerComponent, AlertComponent, UserCardComponent],
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

  loadExample() {
    this.refreshAction.next();
  }
}
