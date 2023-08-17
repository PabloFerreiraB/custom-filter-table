import { Component } from '@angular/core';
import { DisplayedColumns, FRUITS, NAMES, PeriodicElement } from './models/user-data';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: DisplayedColumns[] = [
    { nameCol: 'id', select: false },
    { nameCol: 'name', select: true },
    { nameCol: 'progress', select: true },
    { nameCol: 'fruit', select: true }
  ];
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): PeriodicElement {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
  };
}
