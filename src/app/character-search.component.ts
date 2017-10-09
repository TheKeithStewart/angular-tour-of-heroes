import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CharacterSearchService } from './character-search.service';
import { Character } from './hero';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css'],
  providers: [CharacterSearchService]
})
export class CharacterSearchComponent implements OnInit {
  characters: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private characterSearchService: CharacterSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.characters = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.characterSearchService.search(term)
        // or the observable of empty characters if no search term
        : Observable.of<Character[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Character[]>([]);
      });
  }

  gotoDetail(character: Character): void {
    const link = ['/detail', character.id];
    this.router.navigate(link);
  }
}
