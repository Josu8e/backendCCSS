import { Component, OnInit } from '@angular/core';
import {Nombramiento} from '../models/Nombramiento';
import {NombramientosService} from './nombramientos.service';

@Component({
  selector: 'ngx-nombramiento',
  template: `<router-outlet></router-outlet>`,

})
export class NombramientoComponent implements OnInit {

  public users: Nombramiento[];
  constructor(public nomService: NombramientosService) { }

  ngOnInit() {
    this.nomService.getNom().subscribe(users => { this.users = users})
  }

}
