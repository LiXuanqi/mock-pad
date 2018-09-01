import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    routing
  ],
  providers: [{
    provide: "collaboration",
    useClass: CollaborationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
