import { AppState } from './redux.config';
import { Todo } from './../interfaces/todo';
import { Injectable, InjectionToken } from '@angular/core';
import { Action, ActionCreator, createStore, Reducer, Store } from 'redux';

export interface AppState {
    filter: String;
    todo: Todo;
    todoList: Todo[];
    completed: Boolean;
}
export interface MyAction extends AppState {
    type: String;
}

const initialState = {
    filter: 'all',
    todo: <Todo>{},
    todoList: [],
    completed: false
};
export const ActionList = {
    updateFilter: 'UpdateFilter',
    todoList: 'UpdateTodoList',
    addTodo: 'AddTodo',
    removeTodo: 'RemoveTodo',
    updateTodo: 'UpdateTodo',
    updateAllCompleted: 'UpdateAllCompleted',
    updateCompleted: 'UpdateCompleted'
};

export const reducer: Reducer<AppState> =
(state: AppState = initialState, action: MyAction): AppState => {
  switch (action.type) {
  case 'UpdateFilter': {
    return Object.assign({}, state, { filter: action.filter });
  }
  case 'UpdateTodoList': {
    return Object.assign({}, state, { todoList: action.todoList });
  }
  case 'AddTodo': {
    return Object.assign({}, state, {todoList: [...state.todoList, action.todo]});
  }
  case 'RemoveTodo': {
    const index = state.todoList.indexOf(action.todo);
    return Object.assign({}, state, {todoList: [
        ...state.todoList.slice(0, index),
        ...state.todoList.slice(index + 1 , state.todoList.length)
    ]});
  }
  case 'UpdateTodo': {
    const index = state.todoList.indexOf(action.todo);
    return Object.assign({}, state, {todoList: [
        ...state.todoList.slice(0, index),
        action.todo,
        ...state.todoList.slice(index + 1 , state.todoList.length)
    ]});
  }
  case 'UpdateAllCompleted': {
    return Object.assign({}, state, {todoList: [
        ...state.todoList.slice().map(item => Object.assign(item, {completed: action.completed}))
    ]}, {completed: action.completed});
  }
  case 'UpdateCompleted': {
    return Object.assign({}, state, { completed: action.completed });
  }
  default:
    return state;
  }
};

export const AppStore = new InjectionToken('App.store');
export function createAppStore(): Store<AppState> {
    return createStore<AppState>(reducer);
}
export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
];
