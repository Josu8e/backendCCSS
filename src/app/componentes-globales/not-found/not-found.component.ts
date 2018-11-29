import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  private selector: string = 'nb-global-spinner';
  constructor(private location: Location, @Inject(DOCUMENT) private document) {}
  ngOnInit(): void {
    this.hideSpinner();
  }
  back() {
    this.location.back();
  }
  hideSpinner(): void {
    const el = this.getSpinnerElement();
    if (el) {
      el.style['display'] = 'none';
    }
  }
  private getSpinnerElement() {
    return this.document.getElementById(this.selector);
  }
}
