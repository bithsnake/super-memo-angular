/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PointerSvgComponent } from './pointer-svg.component';

describe('PointerSvgComponent', () => {
  let component: PointerSvgComponent;
  let fixture: ComponentFixture<PointerSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointerSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
