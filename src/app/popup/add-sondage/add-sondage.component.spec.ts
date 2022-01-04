import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSondageComponent } from './add-sondage.component';

describe('AddSondageComponent', () => {
  let component: AddSondageComponent;
  let fixture: ComponentFixture<AddSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
