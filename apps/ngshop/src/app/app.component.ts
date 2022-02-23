/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@nr-space/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  title = 'ngshop';

  ngOnInit(): void {
      this.usersService.initAppSession();
  }

}
