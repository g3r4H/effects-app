import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  /**
   * The big picture of the logic of an Effect is:
   * 1. Catch the desired action
   * 2. Make some external logic; for example, an API Request
   * 3. Return an action with the data returned by the last step. This is important because, at the end, an Observable<Action> must be returned
   */
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsers), // Catch the desired action
      mergeMap(() =>
        // 'mergeMap' is the operator the documentation recommends
        this.usersService.getUsers().pipe(
          map((data) => usersActions.loadUsersSuccess({ users: data })), // An Obserbable<Action> must be returned and, by returnig an Action, 'map' automatically puts it inside an Observable
          catchError((err) => of(usersActions.loadUsersError({ payload: err }))) // 'We need to use 'of" because catchError' does not return an Obserable
        )
      )
    )
  );
}
