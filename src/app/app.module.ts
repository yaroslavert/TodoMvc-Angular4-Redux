import { appStoreProviders } from './redux/redux.config';
import { TodoStoreService } from './services/todo-store.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { TodoFilterPipe } from './pipes/todo-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    FooterComponent,
    TodoFilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
  providers: [TodoStoreService, appStoreProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
