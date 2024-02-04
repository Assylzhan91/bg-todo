import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';


import {CategoriesComponent} from "./views/categories/categories.component";
import {DataHandlerService} from "./services/data-handler.service";
import {TasksComponent} from "./views/tasks/tasks.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoriesComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataHandlerService]
})
export class AppComponent {

}
