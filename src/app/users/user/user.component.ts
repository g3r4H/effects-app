import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as userActions from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  router = inject(ActivatedRoute);
  user!: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('user', 'user').subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });

    this.router.params.subscribe(({ id }) => {
      console.log('ID', id);
      this.store.dispatch(userActions.loadUser({ id }));
    });
  }
}
