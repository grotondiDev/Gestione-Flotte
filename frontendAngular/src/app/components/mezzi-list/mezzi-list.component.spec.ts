import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MezziListComponent } from './mezzi-list.component';

describe('MezziListComponent', () => {
  let component: MezziListComponent;
  let fixture: ComponentFixture<MezziListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MezziListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MezziListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
