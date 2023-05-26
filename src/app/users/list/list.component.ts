import { Component, OnInit, inject } from '@angular/core';
import { IUser, User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit {
  private usersService = inject(UsersService);
  users: User[] = [];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      console.log('USERS', users);
      this.users = users;
    });
  }
}
