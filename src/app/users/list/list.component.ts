import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select('users').subscribe(({ users, loading, error }) => {
      console.log('USERS', users);
      this.users = users;
      this.loading = loading;
      this.error = error;
    });
  }
}
