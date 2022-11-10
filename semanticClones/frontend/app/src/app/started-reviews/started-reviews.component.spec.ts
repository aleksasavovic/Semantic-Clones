import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartedReviewsComponent } from './started-reviews.component';

describe('StartedReviewsComponent', () => {
  let component: StartedReviewsComponent;
  let fixture: ComponentFixture<StartedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartedReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
