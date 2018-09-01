import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import uuidv1 from 'uuid/v1';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public handleTryDemoClicked(): void {
    const sessionId = uuidv1();
    this.router.navigateByUrl(`sessions/${sessionId}`);
  }

}
