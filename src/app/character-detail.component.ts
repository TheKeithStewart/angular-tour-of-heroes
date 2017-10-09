import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Character } from './hero';
import { CharacterService } from './character.service';

@Component({
  selector: 'my-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  @Input() character: Character;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.characterService.getCharacter(id)
            .then(character => this.character = character);
      } else {
        this.navigated = false;
        this.character = new Character();
      }
    });
  }

  save(): void {
    this.characterService
        .save(this.character)
        .then(character => {
          this.character = character; // saved character, w/ id if new
          this.goBack(character);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedCharacter: Character = null): void {
    this.close.emit(savedCharacter);
    if (this.navigated) { window.history.back(); }
  }
}
