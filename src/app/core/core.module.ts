import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SearchBoxComponent,
    TodoComponent
  ],
  declarations: [SearchBoxComponent, TodoComponent]
})
export class CoreModule { }
