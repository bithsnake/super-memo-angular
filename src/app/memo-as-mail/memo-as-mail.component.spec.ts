/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemoAsMailComponent } from './memo-as-mail.component';

describe('MemoAsMailComponent', () => {
  let component: MemoAsMailComponent;
  let fixture: ComponentFixture<MemoAsMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoAsMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoAsMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
