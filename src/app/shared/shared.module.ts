import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsbnPipe } from '../pipes/isbn.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    IsbnPipe,
    LoaderComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [IsbnPipe, CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent]
})
export class SharedModule { }
