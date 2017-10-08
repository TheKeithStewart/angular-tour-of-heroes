import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharacterComponent implements OnInit {
  characters: Hero[];
  selectedCharacter: Hero;
  addingCharacter = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getCharacters(): void {
    this.heroService
      .getCharacters()
      .then(characters => this.characters = characters)
      .catch(error => this.error = error);
  }

  addCharacter(): void {
    this.addingCharacter = true;
    this.selectedCharacter = null;
  }

  close(savedHero: Hero): void {
    this.addingCharacter = false;
    if (savedHero) { this.getCharacters(); }
  }

  deleteCharacter(character: Hero, event: any): void {
    event.stopPropagation();
    this.heroService
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

  onSelect(hero: Hero): void {
    this.selectedCharacter = hero;
    this.addingCharacter = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCharacter.id]);
  }
}
