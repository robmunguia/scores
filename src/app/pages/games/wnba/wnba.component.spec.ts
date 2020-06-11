import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WnbaComponent } from './wnba.component';

describe('WnbaComponent', () => {
  let component: WnbaComponent;
  let fixture: ComponentFixture<WnbaComponent>;

  beforeEach(async(() => {
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
