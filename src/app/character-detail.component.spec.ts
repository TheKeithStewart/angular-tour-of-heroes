import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from './character.service';
import { Character } from './hero';

class MockCharacterService {
  save() { };
}

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let characterService: CharacterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CharacterService, useClass: MockCharacterService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    characterService = TestBed.get(CharacterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#save', () => {
    let character: Character;

    beforeEach(() => {
      character = new Character();
      component.character = character;
    });

    it('should save the character', () => {
      spyOn(characterService, 'save')
        .and.returnValue(new Promise((resolve, reject) => resolve(character)));
      component.save();
      expect(characterService.save).toHaveBeenCalledWith(component.character);
    });

    it('should go back if character saved successfully', fakeAsync(() => {
      spyOn(characterService, 'save')
        .and.returnValue(new Promise((resolve, reject) => resolve(character)));
      const spy = spyOn(component, 'goBack').and.callThrough();

      component.save();
      tick();
      expect(spy).toHaveBeenCalled();
    }));

    it('should display an error if save fails', fakeAsync(() => {
      spyOn(characterService, 'save')
        .and.returnValue(new Promise((resolve, reject) => reject('Error!')));

      component.save();
      tick();
      expect(component.error).toEqual('Error!');
    }));
  });

  describe('#goBack', () => {
    it('should emit the saved character', () => {
      const expected = new Character();
      component.close
        .subscribe(result => expect(result).toBe(expected));

      component.goBack(expected);
    });

    it('should go back if navigated is try', () => {
      const spy = spyOn(window.history, 'back');
      component.navigated = true;

      component.goBack();
      expect(spy).toHaveBeenCalled();
    });
  });
});
