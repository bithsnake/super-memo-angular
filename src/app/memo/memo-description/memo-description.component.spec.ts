import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoDescriptionComponent } from './memo-description.component';

describe('MemoDescriptionComponent', () => {
  let component: MemoDescriptionComponent;
  let fixture: ComponentFixture<MemoDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
