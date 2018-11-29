import {ToasterConfig} from 'angular2-toaster';

export const paramsConfig = {
  position: 'toast-top-right',
  animationType: 'fade',
  timeout: 5000,
  toastsLimit: 5,
  isNewestOnTop: true,
  isHideOnClick: true,
  isDuplicatesPrevented: false,
  isCloseButton: true,
};

export const configToasterManager = new ToasterConfig({
  positionClass: paramsConfig.position,
  timeout: paramsConfig.timeout,
  newestOnTop: paramsConfig.isNewestOnTop,
  tapToDismiss: paramsConfig.isHideOnClick,
  preventDuplicates: paramsConfig.isDuplicatesPrevented,
  animation: paramsConfig.animationType,
  limit: paramsConfig.toastsLimit,
});
