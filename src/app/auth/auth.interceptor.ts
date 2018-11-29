import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private authService: AuthService) {
  }

  refactorRequestWithNewToken(request) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getAuthorization().access_token}`,
      },
    });
  }

  refresh(): any {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.authService.refreshToken().do(() => {
        this.refreshTokenInProgress = false;
        this.tokenRefreshedSource.next();
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = this.authService.getAuthorization();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token === null ? null : token.access_token}`,
      },
    });
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      // Error in the request
      if (err instanceof HttpErrorResponse) {
        if (this.authService.getAuthorization() == null) {
          return Observable.empty();
        }
        if (err.status === 401) {
          return this.refresh()
            .switchMap(() => {
              req = this.refactorRequestWithNewToken(req);
              return next.handle(req);
            })
            .catch(() => {
              this.logout();
              return Observable.empty();
            });
        }
        return Observable.throw(err);
      }
    });
  }
}
