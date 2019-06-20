import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatToolbarModule,
  MatCardModule,
  MatIconModule, 
  MatInputModule, 
  MatFormFieldModule,
  MatListModule
   } from '@angular/material';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatListModule,
    ],
  exports: [],
  providers: [AppComponent],
  entryComponents: [AppComponent],
  declarations: [ 
    AppComponent, 
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
