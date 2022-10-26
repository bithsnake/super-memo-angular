/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoResolverService } from './memo-resolver.service';

describe('Service: MemoResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoResolverService]
    });
  });

  it('should ...', inject([MemoResolverService], (service: MemoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
