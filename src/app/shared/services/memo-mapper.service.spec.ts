/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoMapperService } from '../../memo/services/memo-mapper.service';

describe('Service: MemoMapper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoMapperService]
    });
  });

  it('should ...', inject([MemoMapperService], (service: MemoMapperService) => {
    expect(service).toBeTruthy();
  }));
});
