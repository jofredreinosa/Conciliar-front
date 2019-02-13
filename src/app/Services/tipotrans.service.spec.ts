import { TestBed, inject } from '@angular/core/testing';

import { TipotransService } from './tipotrans.service';

describe('TipotransService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipotransService]
    });
  });

  it('should be created', inject([TipotransService], (service: TipotransService) => {
    expect(service).toBeTruthy();
  }));
});
