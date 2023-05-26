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
      map((resp) => {
        const data = resp.data;
        return data.map((userData) => new User(userData));
      })
    );
  }
}
