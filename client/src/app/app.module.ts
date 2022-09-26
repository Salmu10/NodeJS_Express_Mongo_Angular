import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Form Reactive
import { ReactiveFormsModule } from '@angular/forms';

// Toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500, // 2.5 seconds
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 2,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
