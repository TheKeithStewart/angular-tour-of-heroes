import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterService } from './character.service';
import { CharactersComponent } from './characters.component';
import { Character } from './hero';

class MockCharacterService {
  getCharacters = jasmine.createSpy('getCharacters')
    .and.returnValue(new Promise((resolve, reject) => { resolve([]) }));
  delete = jasmine.createSpy('delete')
    .and.returnValue(new Promise((resolve, reject) => { }))
}

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let characterService: CharacterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: CharacterService, useClass: MockCharacterService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    characterService = TestBed.get(CharacterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#getCharacters', () => {
    it('should get characters', () => {
      component.getCharacters();
      expect(characterService.getCharacters).toHaveBeenCalled();
    });

    it('should display message if there is an error', fakeAsync(() => {
      const error = 'No characters for you!!!';
      characterService.getCharacters = jasmine.createSpy('getCharacters')
        .and.returnValue(new Promise((resolve, reject) => { reject(error) }));

      component.getCharacters();
      tick();
      expect(component.error).toEqual(error);
    }));
  });

  describe('#close', () => {
    it('should get characters if a character was saved', () => {
      const getCharacters = spyOn(component, 'getCharacters');
      const savedCharacter = new Character();
      component.addingCharacter = true;

      component.close(savedCharacter);
      expect(component.addingCharacter).toEqual(false);
      expect(getCharacters).toHaveBeenCalled();
    });

    it('should no get characters if no characters were saved', () => {
      const getCharacters = spyOn(component, 'getCharacters');
      component.addingCharacter = true;

      component.close(null);
      expect(component.addingCharacter).toEqual(false);
      expect(getCharacters).not.toHaveBeenCalled();
    });
  });

  describe('#deleteCharacter', () => {
    const event = new Event('click');
    const deleteCharacter = new Character(1);

    beforeEach(() => {
      component.characters = [deleteCharacter, new Character(2), new Character(3)];
      component.selectedCharacter = deleteCharacter;
    });

    it('should stop propagating the click event', () => {
      const stopPropagation = spyOn(event, 'stopPropagation');

      component.deleteCharacter(deleteCharacter, event);
      expect(stopPropagation).toHaveBeenCalled();
    });

    it('should delete the character', () => {
      component.deleteCharacter(deleteCharacter, event);
      expect(characterService.delete).toHaveBeenCalledWith(deleteCharacter);
    });

    it('should remove the deleted character from set of characters', fakeAsync(() => {
      characterService.delete = jasmine.createSpy('delete')
        .and.returnValue(new Promise((resolve, reject) => resolve(deleteCharacter)));
      component.deleteCharacter(deleteCharacter, event);
      tick();
      expect(component.characters.find(character => character === deleteCharacter)).toBeUndefined();
      expect(component.selectedCharacter).toBeNull()
    }));

    it('should display error message if on error', fakeAsync(() => {
      const error = 'Noooooo!!!';
      characterService.delete = jasmine.createSpy('delete')
        .and.returnValue(new Promise((resolve, reject) => reject(error)));

      component.deleteCharacter(deleteCharacter, event);
      tick();
      expect(component.error).toEqual(error);
    }));
  });

  describe('#onSelect', () => {
    it('should set the selectedCharacter property', () => {
      const character = new Character();

      component.onSelect(character);
      expect(component.selectedCharacter).toBe(character);
    });

    it('should set addingCharacter to false', () => {
      const character = new Character();
      component.addingCharacter = true;

      component.onSelect(character);
      expect(component.addingCharacter).toEqual(false);
    });
  });
});
