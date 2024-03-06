import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {TaskType} from "../../data/TestData";
import {DataHandlerService} from "../../services/data-handler.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";


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
  tasks: TaskType[] = []
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']

  dataSource!: MatTableDataSource<TaskType>

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) private sort!: MatSort

  cdr = inject(ChangeDetectorRef)
  dataHandlerService = inject(DataHandlerService)

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.dataHandlerService.getAllTasks$.subscribe( tasks => {
      this.tasks = tasks
      this.cdr.detectChanges()
      this.refreshTable()
    })
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

  refreshTable(): void{
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
