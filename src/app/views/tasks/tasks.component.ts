import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {TaskType} from "../../data/TestData";
import {DataHandlerService} from "../../services/data-handler.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit{
  tasks: TaskType[] = this.dataHandlerService.fillTasks()

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']
  dataSource!: MatTableDataSource<TaskType>

  constructor(private dataHandlerService: DataHandlerService) {}

  ngOnInit(): void {
    this.dataSource  = new MatTableDataSource()
    this.dataSource.data = this.tasks
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
}
