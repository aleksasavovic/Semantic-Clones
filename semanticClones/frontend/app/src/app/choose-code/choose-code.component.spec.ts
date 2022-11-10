import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCodeComponent } from './choose-code.component';

describe('ChooseCodeComponent', () => {
  let component: ChooseCodeComponent;
  let fixture: ComponentFixture<ChooseCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
