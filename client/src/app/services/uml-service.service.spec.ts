import { TestBed } from '@angular/core/testing';

import { UmlServiceService } from './uml-service.service';

describe('UmlServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UmlServiceService = TestBed.get(UmlServiceService);
    expect(service).toBeTruthy();
  });
});
