/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoServices } from './memo.service';

describe('Service: Memo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoServices]
    });
  });

  it('should ...', inject([MemoServices], (service: MemoServices) => {
    expect(service).toBeTruthy();
  }));
});
