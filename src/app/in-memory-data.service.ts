import { Hero, Villain } from './hero';

export class InMemoryDataService {
  createDb() {
    const characters = [
      new Hero(11, 'Mr. Nice', 2, 6),
      new Hero(12, 'Narco', 6, 4),
      new Hero(13, 'Bombasto', 8, 6),
      new Hero(14, 'Celeritas', 3, 2),
      new Hero(15, 'Magneta', 4, 4),
      new Hero(16, 'RubberMan', 1, 9),
      new Hero(17, 'Dynama', 5, 5),
      new Hero(18, 'Dr IQ', 4, 4),
      new Hero(19, 'Magma', 5, 4),
      new Hero(20, 'Tornado', 9, 9),
      new Villain(21, 'Magneto', 6, 7)
    ];
    return { characters };
  }
}
