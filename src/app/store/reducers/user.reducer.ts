import { createReducer, on, Action } from '@ngrx/store';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { User } from 'src/app/models/user.model';

export interface UserState {
  id: string | null;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const userInitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  userInitialState,
  on(loadUser, (state, { id }) => ({ ...state, id, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user: { ...user },
    loading: false,
    loaded: true,
  })),
  on(loadUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
