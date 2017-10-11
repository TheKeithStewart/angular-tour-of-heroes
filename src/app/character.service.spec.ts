import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let backend: MockBackend;
  let lastConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterService,
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

  it('should be created', inject([CharacterService], (service: CharacterService) => {
    expect(service).toBeTruthy();
  }));
});
