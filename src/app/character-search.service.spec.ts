import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CharacterSearchService } from './character-search.service';

describe('CharacterSearchService', () => {
  let backend: MockBackend;
  let lastConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterSearchService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions }
      ]
    });
  });

  beforeEach(() => {
    backend = TestBed.get(ConnectionBackend);
    backend.connections.subscribe((connection: any) => lastConnection = connection);
  });

  it('should be created', inject([CharacterSearchService], (service: CharacterSearchService) => {
    expect(service).toBeTruthy();
  }));
});
