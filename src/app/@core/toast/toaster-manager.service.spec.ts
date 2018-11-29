import { TestBed, inject } from '@angular/core/testing';

import { ToasterManagerService } from './toaster-manager.service';

describe('ToasterManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToasterManagerService],
    });
  });

  it('should be created', inject([ToasterManagerService], (service: ToasterManagerService) => {
    expect(service).toBeTruthy();
  }));
});
