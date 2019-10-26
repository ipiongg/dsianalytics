import { TestBed } from '@angular/core/testing';

import { AnalisesService } from './analises.service';

describe('AnalisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalisesService = TestBed.get(AnalisesService);
    expect(service).toBeTruthy();
  });
});
