import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// components
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
// services
import { CollaborationService } from "./services/collaboration.service";
// routes
import { routing } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { CodepadComponent } from './components/codepad/codepad.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HomeComponent,
    CodepadComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpModule,
    routing
  ],
  providers: [{
    provide: "collaboration",
    useClass: CollaborationService
  }, {
    provide: "data",
    useClass: DataService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
