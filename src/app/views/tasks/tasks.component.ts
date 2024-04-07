import {
  ChangeDetectionStrategy,
  AfterViewInit,
  EventEmitter,
  TemplateRef,
  ViewChild,
  Component,
  Output,
  inject,
  Input,
  OnInit, OnDestroy
} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {CommonModule, NgFor} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

import {EditTaskComponent} from "../../dialogs/edit-task-dialog/edit-task.component";
import {TaskType} from "../../data/TestData";
import {Subject, takeUntil} from "rxjs";

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
export class TasksComponent implements OnInit, AfterViewInit, OnDestroy{
  dialog = inject(MatDialog)

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']

  destroy$ = new Subject<void>()

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
        case 'priority': return task.priority?.id || ''

        case 'category': return task.category?.id || ''

        case 'date': return Number(task?.date) || ''

        default: return ''
      }
    }
  }

  addTableObjects(): void{
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  openEditTaskDialog(task: TaskType): void{
    let dialogRef =  this.dialog.open(EditTaskComponent, {
      data: [task, 'Edit task'],
      autoFocus: false
    })
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((task: TaskType)=>this.updateTask.emit(task))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
