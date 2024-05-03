import {inject, Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'taskDate',
  standalone: true,
  pure: true
})
export class TaskDatePipe implements PipeTransform {

   transform = (date: Date | string, format: string = 'mediumDate'): string => {
    if(!date){
      return 'No deadline'
    }

    date = new Date(date);
    const currentDate = new Date().getDate();

    if (date.getDate() === currentDate) {
      return 'Today'
    }
    if (date.getDate() === currentDate - 1) {
      return 'Yesterday';
    }
    if (date.getDate() === currentDate + 1) {
      return 'Tomorrow';
    }
    return new DatePipe('en-EN').transform(date, format) as string
  }

}
