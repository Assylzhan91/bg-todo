import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {DataHandlerService} from "../../services/data-handler.service";
import {Observable} from "rxjs";
import {CategoryType} from "../../data/TestData";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit{
  categories$: Observable<CategoryType[]> = this.dataHandlerService.getCategories()

  constructor(private dataHandlerService: DataHandlerService) {}

  ngOnInit() {
    /*this.categories = this.dataHandlerService.getCategories()
    this.categories.subscribe(console.log)*/
  }

}
