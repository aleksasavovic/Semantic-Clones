import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveCodesComponent } from './inactive-codes.component';

describe('InactiveCodesComponent', () => {
  let component: InactiveCodesComponent;
  let fixture: ComponentFixture<InactiveCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
