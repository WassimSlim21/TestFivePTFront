import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnFileComponent } from './own-file.component';

describe('OwnFileComponent', () => {
  let component: OwnFileComponent;
  let fixture: ComponentFixture<OwnFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
