import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmgComponent } from './rmg.component';

describe('RmgComponent', () => {
  let component: RmgComponent;
  let fixture: ComponentFixture<RmgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
