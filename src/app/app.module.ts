import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AuthGuard } from './guards/auth.guard';
import { DialogService } from './guards/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'error', component: ErrorPageComponent }
    ]),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AuthorModule,
    BookModule
  ],
  providers: [CanDeactivateGuard, AuthGuard,DialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
