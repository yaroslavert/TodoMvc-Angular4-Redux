import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStore, ActionList } from './../../redux/redux.config';
import { Todo } from './../../interfaces/todo';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() public todo: Todo;
  @Output() public remove: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  constructor(@Inject(AppStore) public store, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: ['']
    });
  }
  editTodo() {
    this.todo.edit = true;
    this.form.get('text').setValue(this.todo.text);
    this._updateTodo();
  }
  onRemove() {
    this.remove.emit(this.todo);
  }
  _updateTodo() {
    const todo = this.todo;
    this.store.dispatch({type: ActionList.updateTodo, todo});
  }
  doneEditing() {
    this.todo.edit = false;
    this.todo.text = this.form.value.text;
    this._updateTodo();
  }
  changeCompleted() {
    this._updateTodo();
  }
}
