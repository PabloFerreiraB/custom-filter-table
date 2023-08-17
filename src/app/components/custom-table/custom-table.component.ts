import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AutoDestroy } from 'src/app/decorators/auto-destroy';
import { ColumnsEnum, DisplayedColumns, PeriodicElement } from 'src/app/models/user-data';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns!: DisplayedColumns[];
  @Input() dataSource!: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @AutoDestroy destroy$: Subject<void> = new Subject<void>();

  globalFilterControl = new FormControl();
  nameFilterControl = new FormControl();
  progressFilterControl = new FormControl();

  selectAllColumns = 'Select all';
  selectedColumns!: any[];
  ColumnsEnum = ColumnsEnum;
  allSelected = false;
  filteredValues = {
    id: '',
    name: '',
    progress: '',
    fruit: ''
  };

  ngOnInit(): void {
    this.getSelectedColumns();

    this.globalFilterControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe({
        next: (globalFilterValue) => {
          this.applyFilters();
        },
        error: ({ error }) => {
          console.log(error.message);
        }
      });

    this.nameFilterControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe({
        next: (nameFilterValue) => {
          this.applyFilters();
        },
        error: ({ error }) => {
          console.log(error.message);
        }
      });

    this.progressFilterControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe({
        next: (progressFilterValue) => {
          this.applyFilters();
        },
        error: ({ error }) => {
          console.log(error.message);
        }
      });

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateAllSelected() {
    this.allSelected =
      this.displayedColumns != null && this.displayedColumns.every((t: any) => t.select);
  }

  someSelected(): boolean {
    if (this.displayedColumns == null) {
      return false;
    }

    return this.displayedColumns.filter((t: any) => t.select).length > 0 && !this.allSelected;
  }

  selectAll(select: boolean) {
    this.allSelected = select;
    if (this.displayedColumns == null) return;
    this.displayedColumns.forEach((t: any) => (t.select = select));
  }

  getSelectedColumns(): string[] {
    this.selectedColumns = this.displayedColumns
      .filter((column) => column.select)
      .map((column) => column.nameCol);

    return this.selectedColumns;
  }

  getColumnValue(element: any, columnName: string): any {
    return element[columnName];
  }

  getHeaderColumns(): string[] {
    return this.displayedColumns.map((column) => column.nameCol);
  }

  private customFilterPredicate() {
    const myFilterPredicate = (data: PeriodicElement | any, filter: string): boolean => {
      const globalFilter = this.globalFilterControl.value;

      let globalMatch = !globalFilter;
      if (globalFilter) {
        globalMatch = this.selectedColumns.some((column) => {
          const value = data[column];
          return value && value.toLowerCase().includes(globalFilter.toLowerCase());
        });
      }

      const nameFilter = this.nameFilterControl.value;
      const progressFilter = this.progressFilterControl.value;

      const nameMatch = !nameFilter || data.name.toLowerCase().includes(nameFilter.toLowerCase());
      const progressMatch =
        !progressFilter || data.progress.toString().includes(progressFilter.toLowerCase());

      return globalMatch && nameMatch && progressMatch;
    };

    return myFilterPredicate;
  }

  private applyFilters() {
    const filters: any = {}; // Initialize an empty object for filters

    for (const key of this.selectedColumns) {
      filters[key] = (this as any)[`${key}FilterControl`]?.value || null; // Use dynamic property access
    }

    this.dataSource.filter = JSON.stringify(filters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
