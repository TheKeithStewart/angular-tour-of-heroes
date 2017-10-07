export class Character {
  constructor(public id?: number, public name?: string) { }
}

export class Hero extends Character {
  readonly type = 'hero';
}

export class Villain extends Character {
  readonly type = 'villain';
}
