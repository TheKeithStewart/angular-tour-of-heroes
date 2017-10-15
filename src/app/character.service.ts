import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Character } from './hero';

@Injectable()
export class CharacterService {
  private charactersUrl = 'app/characters';  // URL to web api

  constructor(private http: Http) { }

  getCharacters(): Promise<Array<Character>> {
    return this.http
      .get(this.charactersUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as Character[];
      })
      .catch(this._handleError);
  }

  getCharacter(id: number): Promise<Character> {
    return this.getCharacters()
      .then(characters => characters.find(character => character.id === id));
  }

  save(character: Character): Promise<Character> {
    if (character.id) {
      return this._put(character);
    }
    return this._post(character);
  }

  delete(character: Character): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.charactersUrl}/${character.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this._handleError);
  }

  // Add new Character
  _post(character: Character): Promise<Character> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.charactersUrl, JSON.stringify(character), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this._handleError);
  }

  // Update existing Character
  _put(character: Character): Promise<Character> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.charactersUrl}/${character.id}`;

    return this.http
      .put(url, JSON.stringify(character), { headers: headers })
      .toPromise()
      .then(() => character)
      .catch(this._handleError);
  }

  _handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
