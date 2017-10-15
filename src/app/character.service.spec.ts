import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CharacterService } from './character.service';
import { Character } from './hero';

describe('CharacterService', () => {
  let service: CharacterService;
  let backend: MockBackend;
  let lastConnection: MockConnection;

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
    service = TestBed.get(CharacterService);
    backend = TestBed.get(ConnectionBackend);
    backend.connections.subscribe((connection: any) => lastConnection = connection);
  });

  describe('#getCharacters', () => {
    it('should query the current service url', () => {
      service.getCharacters();
      expect(lastConnection).toBeDefined('no http service connection at all?');
      expect(lastConnection.request.url).toMatch(/app\/characters$/, 'url invalid');
    });

    it('should return characters', fakeAsync(() => {
      const character1 = new Character();
      const character2 = new Character();
      let result: Character[];

      service.getCharacters().then(characters => result = characters);
      lastConnection.mockRespond(new Response(new ResponseOptions({
        body: { data: [character1, character2] }
      })));
      tick();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(character1);
      expect(result[1]).toEqual(character2);
    }));

    // I DO NOT LIKE THIS!!!
    // having the handleError function be private means that I can't determine
    // if it is being called.
    it('should catch and handle errors', fakeAsync(() => {
      let result: Character[];
      let caughtError: any;
      service.getCharacters()
        .then(characters => result = characters)
        .catch((error: any) => caughtError = error);
      lastConnection.mockRespond(new Response(new ResponseOptions({
        status: 404,
        statusText: 'URL not Found',
      })));
      tick();
      expect(result).toBeUndefined();
      expect(caughtError).toBeDefined();
    }));

    // Making the handleError function public means that I can spy on it
    // and make a determination about whether or not it is in use.
    it('should catch and handle errors', fakeAsync(() => {
      const errorHandler = spyOn(service, '_handleError');

      service.getCharacters();
      lastConnection.mockRespond(new Response(new ResponseOptions({
        status: 404,
        statusText: 'URL not Found',
      })));
      tick();
      expect(errorHandler).toHaveBeenCalled();
    }));
  });

  describe('#getCharacter', () => {
    const character1 = new Character(1, 'Mr. Awesome');
    const character2 = new Character(2, 'Dr. Not-so-awesome');

    beforeEach(() => {
      spyOn(service, 'getCharacters')
        .and.returnValue(new Promise((resolve, reject) => resolve([character1, character2])));
    });

    // Option without fakeAsync
    it('should return the character if the character is part of the set', () => {
      service.getCharacter(2).then(result => {
        expect(result).toEqual(character2);
      });
    });

    // Option with fakeAsync
    it('should return the character if the character is part of the set', fakeAsync(() => {
      let result;
      service.getCharacter(2).then(character => result = character);
      tick();
      expect(result).toEqual(character2);
    }));

    it('should return undefined if the character is not part of the set', () => {
      service.getCharacter(20).then(result => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('#save', () => {
    it('should update the character if the character already exists', () => {
      const put = spyOn(service, '_put');
      const existingCharacter = new Character(1, 'Existing Character');

      service.save(existingCharacter);
      expect(put).toHaveBeenCalledWith(existingCharacter);
    });

    it('should create the character if the character does not yet exist', () => {
      const post = spyOn(service, '_post');
      const newCharacter = new Character();
      newCharacter.name = 'Existing Character';

      service.save(newCharacter);
      expect(post).toHaveBeenCalledWith(newCharacter);
    });
  });

  describe('#delete', () => {
    const newCharacter = new Character(1);

    it('should send a DELETE request to the service URL', () => {
      service.delete(newCharacter);
      expect(lastConnection.request.url).toMatch(`app/characters/${newCharacter.id}`);
      expect(lastConnection.request.method).toEqual(RequestMethod.Delete);
      expect(lastConnection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    it('should catch and handle errors', fakeAsync(() => {
      const errorHandler = spyOn(service, '_handleError');
      service.delete(newCharacter);
      lastConnection.mockError(new Error('Drat!!!'))
      tick();
      expect(errorHandler).toHaveBeenCalled();
    }));
  });
});
