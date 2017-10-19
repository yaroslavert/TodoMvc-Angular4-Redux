import { AppStore, ActionList } from './../redux/redux.config';
import { Todo } from './../interfaces/todo';
import { TodoStoreService } from './../services/todo-store.service';
import { Component, OnInit, Inject, HostListener } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todoList: Todo[];
  public filter: String;
  public selectedEditTodo: Todo;
  constructor(public todoStoreService: TodoStoreService, @Inject(AppStore) public store) { }
  
  ngOnInit() {
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.todoList = state.todoList;
      this.filter = state.filter;
    });
    this.todoStoreService.getTodoList()
      .subscribe(
        (todoList: Todo[]) => {
          this.store.dispatch({type: ActionList.todoList, todoList});
        },
        (err) => {
          console.log('err', err);
        }
      );
  }
  remove(todo: Todo) {
    this.todoStoreService.removeTodoFromList(todo)
      .subscribe(
        (res) => {
          this.store.dispatch({type: ActionList.removeTodo, todo});
        },
        (err) => {
          console.log('err', err);
        }
      );
  }
}
