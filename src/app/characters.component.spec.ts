import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterService } from './character.service';
import { CharactersComponent } from './characters.component';
import { Character } from './hero';

class MockCharacterService {
  getCharacters = jasmine.createSpy('getCharacters')
    .and.returnValue(new Promise((resolve, reject) => { resolve([]) }));
}

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

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
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSelect', () => {
    it('should set the selectedCharacter property', () => {
      const character = new Character();

      component.onSelect(character);
      expect(component.selectedCharacter).toBe(character);
    });

    it('should set addingCharacter to false');
  });
});
