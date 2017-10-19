import { TodoFilterPipe } from './../pipes/todo-filter.pipe';
import { TodoStoreService } from './../services/todo-store.service';
import { Todo } from './../interfaces/todo';
import { AppStore, ActionList } from './../redux/redux.config';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [TodoFilterPipe]
})
export class FooterComponent implements OnInit {

  public countTodoList: Number;
  public filter: String;
  constructor(@Inject(AppStore) public store, public todoStoreService: TodoStoreService, public todoPipe: TodoFilterPipe) { }

  ngOnInit() {
    this._update();
    this.store.subscribe(() => this._update());
  }
  updateFilter(filter: String) {
    this.store.dispatch({type: ActionList.updateFilter, filter});
  }
  clearCompleted() {
    this.store.dispatch({type: ActionList.updateAllCompleted, completed: false});
  }
  _update() {
    const state = this.store.getState();
    this.filter = state.filter;
    this.countTodoList = this.todoPipe.transform(state.todoList, state.filter).length;
  }

}
