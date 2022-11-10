import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCodesComponent } from './active-codes.component';

describe('ActiveCodesComponent', () => {
  let component: ActiveCodesComponent;
  let fixture: ComponentFixture<ActiveCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
