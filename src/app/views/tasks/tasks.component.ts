import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {Observable} from "rxjs";
import {TaskType} from "../../data/TestData";
import {DataHandlerService} from "../../services/data-handler.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  tasks$: Observable<TaskType[]> = this.dataHandlerService.fillTasks()

  constructor(private dataHandlerService: DataHandlerService) {}

}
