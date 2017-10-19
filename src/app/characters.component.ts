import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Character } from './hero';
import { CharacterService } from './character.service';

@Component({
  selector: 'my-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  selectedCharacter: Character;
  addingCharacter = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private characterService: CharacterService) { }

  getCharacters(): void {
    this.characterService
      .getCharacters()
      .then(characters => this.characters = characters)
      .catch(error => this.error = error);
  }

  addCharacter(): void {
    this.addingCharacter = true;
    this.selectedCharacter = null;
  }

  close(savedCharacter: Character): void {
    this.addingCharacter = false;
    if (savedCharacter) { this.getCharacters(); }
  }

  deleteCharacter(character: Character, event: Event): void {
    event.stopPropagation();
    this.characterService
      .delete(character)
      .then(res => {
        this.characters = this.characters.filter(h => h !== character);
        if (this.selectedCharacter === character) { this.selectedCharacter = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
    this.addingCharacter = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCharacter.id]);
  }
}
