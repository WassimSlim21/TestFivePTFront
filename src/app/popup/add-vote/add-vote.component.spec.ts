import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoteComponent } from './add-vote.component';

describe('AddVoteComponent', () => {
  let component: AddVoteComponent;
  let fixture: ComponentFixture<AddVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
