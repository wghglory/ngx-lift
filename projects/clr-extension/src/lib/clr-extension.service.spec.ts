import {TestBed} from '@angular/core/testing';

import {ClrExtensionService} from './clr-extension.service';

describe('ClrExtensionService', () => {
  let service: ClrExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClrExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
