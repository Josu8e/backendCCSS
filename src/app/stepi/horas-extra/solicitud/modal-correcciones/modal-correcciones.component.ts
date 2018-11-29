import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-correcciones',
  templateUrl: './modal-correcciones.component.html',
  styleUrls: ['./modal-correcciones.component.scss']
})
export class ModalCorreccionesComponent implements OnInit {

  @Input() retroalimentacion;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
