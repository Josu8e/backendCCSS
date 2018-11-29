import { Component, OnInit } from '@angular/core';
import {Author} from './author';

@Component({
  selector: 'ngx-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  authors: Array<Author>= [];
  constructor() { }

  ngOnInit() {
    this.authors.push(new Author('Brayan Gerardo Arrieta Alfaro', 'Ing. Computación'));
    this.authors.push(new Author('Marco Felipe Martínez Barahona', 'Ing. Computación'));
    this.authors.push(new Author('Edward Andrey Murillo Castro', 'Ing. Computación'));
    this.authors.push(new Author('Jose Miguel Murillo Rodriguez', 'Ing. Computación'));
    this.authors.push(new Author('Andrew Jose Alvarado Valenciano', 'Ing. Computación'));
    this.authors.push(new Author('Miguel Ángel Mendez Rojas', 'Ing. Computación'));
  }
}
