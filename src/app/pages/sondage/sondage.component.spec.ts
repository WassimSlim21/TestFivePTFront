import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageComponent } from './sondage.component';

describe('SondageComponent', () => {
  let component: SondageComponent;
  let fixture: ComponentFixture<SondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
