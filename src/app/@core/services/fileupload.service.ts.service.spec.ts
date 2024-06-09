import { TestBed } from '@angular/core/testing';

import { FileuploadServiceTsService } from './fileupload.service.ts.service';

describe('FileuploadServiceTsService', () => {
  let service: FileuploadServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileuploadServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
