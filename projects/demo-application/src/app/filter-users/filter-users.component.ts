import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {filter} from 'rxjs';

import {AlertComponent, PageContainerComponent, SpinnerComponent} from '../../../../clr-extension/src/public-api';
import {switchMapWithAsyncState} from '../../../../ngx-extension/src/public-api';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-filter-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClarityModule, PageContainerComponent, SpinnerComponent, AlertComponent],
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
