import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddMezzoComponent } from './add-mezzo.component';

describe('AddMezzoComponent', () => {
  let component: AddMezzoComponent;
  let fixture: ComponentFixture<AddMezzoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMezzoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMezzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
