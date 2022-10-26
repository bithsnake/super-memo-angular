/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemoItemsComponent } from './memo-items.component';

describe('MemoItemsComponent', () => {
  let component: MemoItemsComponent;
  let fixture: ComponentFixture<MemoItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
