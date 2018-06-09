import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // replaces previous Http service
import { FormsModule } from '@angular/forms';
import { HttpInterceptorService } from './service/http-interceptor-service'
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpService } from './service/http-service';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [HttpService,{ 
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpInterceptorService, 
    multi: true 
} ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
