import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Creado por Estudiantes del Instituto Tecnologico de Costa Rica Sede San Carlos ©2018.
    </span>
    <a class="btn btn-primary btn-tn" (click)="direccionarAutores()">Mas Información</a>
  `,
})
export class FooterComponent {
  constructor(private router: Router) { }

  direccionarAutores(): void {
    this.router.navigate(['/stepi/autores']);
  }
}
