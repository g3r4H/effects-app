import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { IResponse } from '../models/reponse.model';
import { User, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private url = 'https://reqres.in/api';

  getUsers() {
    return this.http.get<IResponse<IUser>>(`${this.url}/users`).pipe(
      // 'map' of rxjs returns an Observable
      map((resp) => {
        const data = resp.data as Array<IUser>;
        return data.map((userData) => new User(userData));
      })
    );
  }

  getUserById(id: string) {
    return this.http.get<IResponse<IUser>>(`${this.url}/users/${id}`).pipe(
      // 'map' of rxjs returns an Observable
      map((resp) => {
        const data = resp.data as IUser;
        return new User(data);
      })
    );
  }
}
