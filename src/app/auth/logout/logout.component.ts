import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'ngx-logout',
  template: ``,
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

}
