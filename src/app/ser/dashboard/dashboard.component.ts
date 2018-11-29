import { environment } from './../../../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  ngOnInit() {
    environment['sistemaActual'] = 'SER';
  }
}
