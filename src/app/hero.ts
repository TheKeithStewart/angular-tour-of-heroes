export class Character {
  type: string;

  constructor(
    public id?: number,
    public name?: string,
    public attackRating = 5,
    public defenseRating = 5,
    public health = 10
  ) { }
}

export class Hero extends Character {
  readonly type = 'hero';
}

export class Villain extends Character {
  readonly type = 'villain';
}
