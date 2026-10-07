import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MezzoDetailsComponent } from './mezzo-details.component';

describe('MezzoDetailsComponent', () => {
  let component: MezzoDetailsComponent;
  let fixture: ComponentFixture<MezzoDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MezzoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MezzoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
