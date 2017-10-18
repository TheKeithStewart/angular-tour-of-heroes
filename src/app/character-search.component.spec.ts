import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterSearchComponent } from './character-search.component';
import { CharacterSearchService } from './character-search.service';
import { Character } from './hero';

class MockCharacterSearchService {
  search() { }
}

describe('CharacterSearchComponent', () => {
  let component: CharacterSearchComponent;
  let fixture: ComponentFixture<CharacterSearchComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSearchComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .overrideComponent(CharacterSearchComponent, {
        set: {
          providers: [
            { provide: CharacterSearchService, useClass: MockCharacterSearchService }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#search', () => {
    it('should set characters to an empty array if no search term provided', fakeAsync(() => {
      component.characters.subscribe(result => {
        expect(result).toEqual([]);
      });

      component.search(null);
      tick(300);
    }));

    it('should search for characters based on term provided', fakeAsync(() => {
      const character = new Character();
      const characterSearchService = fixture.debugElement.injector.get(CharacterSearchService);
      const spy = spyOn(characterSearchService, 'search').and.returnValue(Character);

      component.search('captain blah');
      tick(300);
      expect(spy).toHaveBeenCalledWith('captain blah');
    }));

    it('should set characters to an empty array if search for characters fails', fakeAsync(() => {
      let result: Character[];
      const characterSearchService = fixture.debugElement.injector.get(CharacterSearchService);
      const spy = spyOn(characterSearchService, 'search').and.throwError('Danger!')

      component.characters.subscribe(characters => result = characters);
      component.search('captain blah');
      tick(300);
      expect(result).toEqual([]);
    }));
  });

  describe('#gotoDetail', () => {
    it('should navigate to the details page for the given character', () => {
      const spy = spyOn(router, 'navigate');
      const character = new Character();
      character.id = 1;

      component.gotoDetail(character);
      expect(router.navigate).toHaveBeenCalledWith(['/detail', character.id]);
    });
  });
});
