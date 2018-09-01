import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodepadComponent } from './codepad.component';

describe('CodepadComponent', () => {
  let component: CodepadComponent;
  let fixture: ComponentFixture<CodepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
