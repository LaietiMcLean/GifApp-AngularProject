//Módulos que crea Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

//Módulos "third-party" o de terceras personas, los que creamos nosotros
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SharedModule, GifsModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
