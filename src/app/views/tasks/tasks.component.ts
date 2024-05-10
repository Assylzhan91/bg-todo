import {
  ChangeDetectionStrategy,
  AfterViewInit,
  EventEmitter,
  TemplateRef,
  OnDestroy,
  ViewChild,
  Component,
  OnInit,
  Output,
  inject,
  Input,
} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {CommonModule, NgFor} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {filter, Subject, takeUntil} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

import {EditTaskComponent} from "@dialogs/edit-task-dialog/edit-task.component";
import {CategoryDAOArray} from "../../data/dao/implements/CategoryDAOArray";
import {DataHandlerService} from "../../services/data-handler.service";
import {TaskDAOArray} from "../../data/dao/implements/TaskDAOArray";
import {TaskDatePipe} from "@pipes/task-date.pipe";
import { typeAction } from "../../models/edit";
import {TaskType} from "../../data/TestData";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconButton,
    CommonModule,
    TaskDatePipe,
    MatCheckbox,
    FormsModule,
    MatIcon,
    NgFor,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DataHandlerService,
    TaskDAOArray, CategoryDAOArray
  ]
})
export class TasksComponent implements OnInit, AfterViewInit, OnDestroy{
  dialog = inject(MatDialog)

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operation', 'select' ]

  destroy$ = new Subject<void>()

  dataSource!: MatTableDataSource<TaskType>

  @Input() tasks!: TaskType[]
  @Input() optionTemplate!: TemplateRef<any>

  @Output() updateTask = new EventEmitter<{task:  TaskType; typeAction: typeof typeAction[number]}>()

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) private sort!: MatSort


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
    let dialogRef =  this.dialog.open<EditTaskComponent>(EditTaskComponent, {
      data: [task, 'Edit task'],
      autoFocus: false
    })
    dialogRef
      .afterClosed()
      .pipe(
        filter((task)=> !!task),
        takeUntil(this.destroy$)
      )
      .subscribe(({ task, typeAction})=>{
        this.updateTask.emit({ task, typeAction})
      })
  }

  actionTask(task: TaskType, action: typeof typeAction[number]): void {
    this.updateTask.emit({ task, typeAction: action})
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
