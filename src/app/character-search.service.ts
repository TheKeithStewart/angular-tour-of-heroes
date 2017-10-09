import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Character } from './hero';

@Injectable()
export class CharacterSearchService {
  constructor(private http: Http) { }

  search(term: string): Observable<Character[]> {
    return this.http
      .get(`app/characters/?name=${term}`)
      .map((r: Response) => r.json().data as Character[])
      .catch((error: any) => {
          console.error('An friendly error occurred', error);
          return Observable.throw(error.message || error);
      });
  }
}
