import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';

import {UserList} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private refreshBS = new BehaviorSubject<undefined | void>(undefined);
  refresh$ = this.refreshBS.asObservable();

  refreshList() {
    this.refreshBS.next();
  }

  getUsers(params?: Record<string, string | number | boolean | readonly (string | number | boolean)[]>) {
    return this.http.get<UserList>(`https://randomuser.me/api`, {params}).pipe(map((list) => list.results));
  }
}
