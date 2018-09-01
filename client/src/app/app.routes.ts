import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CodepadComponent } from './components/codepad/codepad.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }, 
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "sessions/:sessionId",
    component: CodepadComponent
  }
];

export const routing = RouterModule.forRoot(routes);