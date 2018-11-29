import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { ToasterManagerService } from './@core/toast/toaster-manager.service';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NotFoundComponent } from './componentes-globales/not-found/not-found.component';
import { ElegirSistemaComponent } from './auth/elegir-sistema/elegir-sistema.component';
import { GlobalesService } from './componentes-globales/globales.service';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent, AuthComponent, LoginComponent, LogoutComponent, NotFoundComponent, ElegirSistemaComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    FormsModule,
    ToasterModule.forRoot(),
    CommonModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    GlobalesService,
    AuthGuard,
    ToasterManagerService,
  ],
})
export class AppModule {
}
