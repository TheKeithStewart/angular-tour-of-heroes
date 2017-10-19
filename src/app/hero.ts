export class Character {
  type: string;
  health = 10;

  constructor(
    public id?: number,
    public name?: string,
    public attackRating?: number,
    public defenseRating?: number
  ) { }
}

export class Hero extends Character {
  readonly type = 'hero';
}

export class Villain extends Character {
  readonly type = 'villain';
}
