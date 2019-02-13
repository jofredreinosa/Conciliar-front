import { TestBed, inject } from '@angular/core/testing';

import { CuenbancsService } from './cuenbancs.service';

describe('CuenbancsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuenbancsService]
    });
  });

  it('should be created', inject([CuenbancsService], (service: CuenbancsService) => {
    expect(service).toBeTruthy();
  }));
});
