import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/header/header.component';
import { TodolistbodyComponent } from 'src/todolistbody/todolistbody.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,HeaderComponent,TodolistbodyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TodoService, multi: true
    }
  ],
})
export class AppComponent {
  title = 'todolist_exercise';
}
