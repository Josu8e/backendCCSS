import { Injectable } from '@angular/core';
import {BodyOutputType, Toast, ToasterService} from 'angular2-toaster';
import {paramsConfig} from './config';


@Injectable()
export class ToasterManagerService {
  constructor(private toasterService: ToasterService) {}
  makeToast(type= 'default', title= 'Default title!', content= `Default content`) {
    this.showToast(type, title, content);
  }
  // type can be 'default', 'info', 'success', 'warning', 'error'
  private showToast(type: string, title: string, body: string) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: paramsConfig.timeout,
      showCloseButton: paramsConfig.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
  }

}
