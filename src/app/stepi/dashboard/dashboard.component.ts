import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  ngOnInit() {
    environment['sistemaActual'] = 'STEPI';
  }
}
