import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountOfTagDetailsComponent } from './social-account-of-tag-details.component';

describe('SocialAccountOfTagDetailsComponent', () => {
  let component: SocialAccountOfTagDetailsComponent;
  let fixture: ComponentFixture<SocialAccountOfTagDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAccountOfTagDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAccountOfTagDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
