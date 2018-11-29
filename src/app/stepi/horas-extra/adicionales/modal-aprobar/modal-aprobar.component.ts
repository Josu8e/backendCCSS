import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-aprobar',
  templateUrl: './modal-aprobar.component.html',
  styleUrls: ['./modal-aprobar.component.scss']
})
export class ModalAprobarComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
