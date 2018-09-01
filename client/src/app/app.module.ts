import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CollaborationService } from "./services/collaboration.service";

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [{
    provide: "collaboration",
    useClass: CollaborationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
