import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMGComponent } from './rmg.component';

describe('RMGComponent', () => {
  let component: RMGComponent;
  let fixture: ComponentFixture<RMGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RMGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
