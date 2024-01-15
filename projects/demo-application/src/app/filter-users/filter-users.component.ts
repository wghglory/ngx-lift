import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, PageContainerComponent, SpinnerComponent} from 'clr-extension';
import {switchMapWithAsyncState} from 'ngx-extension';
import {filter} from 'rxjs';

import {UserCardComponent} from '../shared/components/user-card/user-card.component';
import {UserService} from '../shared/services/user.service';

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
    UserCardComponent,
  ],
  templateUrl: './filter-users.component.html',
  styleUrl: './filter-users.component.scss',
})
export class FilterUsersComponent {
  genderControl = new FormControl('');

  searchState$ = this.genderControl.valueChanges.pipe(
    filter(Boolean),
    switchMapWithAsyncState((gender) => this.userService.getUsers({gender, results: 9})),
  );

  private userService = inject(UserService);
}
