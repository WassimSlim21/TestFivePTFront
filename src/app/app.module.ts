import { LayoutComponent } from './layout/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, /* other http imports */ } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './layout/layout.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
