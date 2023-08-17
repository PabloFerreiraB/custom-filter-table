export interface PeriodicElement {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface DisplayedColumns {
  nameCol: string;
  select: boolean;
}

/** Constants used to fill up our data base. */
export const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple'
];

export const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

export enum ColumnsEnum {
  ID = 'id',
  NAME = 'name',
  PROGRESS = 'progress',
  FRUIT = 'fruit'
}
