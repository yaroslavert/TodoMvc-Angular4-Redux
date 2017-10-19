import { Todo } from './../interfaces/todo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todoList: Todo[], filter: String): any {
    switch (filter) {
      case 'all': {
        return todoList;
      }
      case 'active': {
        return todoList.filter(todo => !todo.completed);
      }
      case 'completed': {
        return todoList.filter(todo => todo.completed);
      }
    }
  }

}
