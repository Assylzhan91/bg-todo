import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, EventEmitter, Input,
  OnInit, Output, TemplateRef,
  ViewChild
} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";

import {TaskType} from "../../data/TestData";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']

  dataSource!: MatTableDataSource<TaskType>

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) private sort!: MatSort

  @Input() tasks!: TaskType[]
  @Input() optionTemplate!: TemplateRef<any>
  @Output() updateTask = new EventEmitter<TaskType>()

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.fillTable()
  }

  ngAfterViewInit(): void {
    this.addTableObjects()
  }

  getPriorityColor(task: TaskType): string {
    if (task.completed) {
      return  '#f8f9fa'
    }

    if (task.priority && task.priority.color) {
      return  task.priority.color
    }
    return '#fff'
  }

  fillTable(): void{
    this.dataSource.data = this.tasks
    this.addTableObjects()
    this.dataSource.sortingDataAccessor = (task: TaskType, colName) =>{
      switch (colName) {
        case 'priority': return task.priority?.id || null

        case 'category': return task.category?.id || null

        case 'date': return Number(task?.date) || null

        default: return null
      }
    }
  }

  addTableObjects(): void{
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
}
