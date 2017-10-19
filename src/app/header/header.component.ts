import { Todo } from './../interfaces/todo';
import { AppStore, ActionList } from './../redux/redux.config';
import { TodoStoreService } from './../services/todo-store.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public completed: Boolean = false;
  constructor(public todoStoreService: TodoStoreService, @Inject(AppStore) public store) { }

  ngOnInit() {
    this._update();
    this.store.subscribe(() => this._update());
  }
  _update() {
    const state = this.store.getState();
    const todoList = state.todoList;
    this.completed = state.completed;
    if (todoList.length) {
      const countCompleted = state.todoList.filter(todo => todo.completed).length;
      if (countCompleted < todoList.length && this.completed) {
        this.store.dispatch({type: ActionList.updateCompleted, completed: false});
      } else if (countCompleted === todoList.length && !this.completed) {
        this.store.dispatch({type: ActionList.updateCompleted, completed: true});
      }
    }
  }
  selectAllCompleted(completed) {
    if (this.store.getState().todoList.length) {
      this.store.dispatch({type: ActionList.updateAllCompleted, completed});
    }
  }
  addTodo(event) {
    const todo: Todo = {
      completed: false,
      edit: false,
      text: event.text
    };
    this.todoStoreService.addTodoToList(todo).subscribe(
      (res) => {
        this.store.dispatch({type: ActionList.addTodo, todo});
      },
      (err) => {

      }
    );
  }
}
