import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageModelComponent } from './error-message-model.component';

describe('ErrorMessageModelComponent', () => {
  let component: ErrorMessageModelComponent;
  let fixture: ComponentFixture<ErrorMessageModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
