/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MemoItemComponent } from './memo-item.component';

describe('MemoComponent', () => {
  let component: MemoItemComponent;
  let fixture: ComponentFixture<MemoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
