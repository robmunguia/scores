import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WnbaComponent } from './wnba.component';

describe('WnbaComponent', () => {
  let component: WnbaComponent;
  let fixture: ComponentFixture<WnbaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WnbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WnbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
