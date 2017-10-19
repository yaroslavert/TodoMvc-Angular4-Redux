import { Todo } from './../interfaces/todo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

let todoLists: Todo[] = [
  {
    text: 'test1',
    completed: false,
    edit: false,
  },
  {
    text: 'test2',
    completed: false,
    edit: false
  }
];

@Injectable()
export class TodoStoreService {

  constructor() { }

  getTodoList(): Observable<Todo[]> {
    return Observable.of(todoLists);
  }
  addTodoToList(newTodo: Todo): Observable<any> {
    todoLists = [...todoLists.slice(), newTodo];
    return Observable.of({'status': 'ok'});
  }
  removeTodoFromList(todo: Todo): Observable<any> {
    todoLists.splice(todoLists.indexOf(todo), 1);
    return Observable.of({'status': 'ok'});
  }
}
