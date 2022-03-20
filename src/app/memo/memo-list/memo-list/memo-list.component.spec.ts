/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemoListComponent } from './memo-list.component';

describe('MemoListComponent', () => {
  let component: MemoListComponent;
  let fixture: ComponentFixture<MemoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
