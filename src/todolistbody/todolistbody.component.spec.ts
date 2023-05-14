import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistbodyComponent } from './todolistbody.component';

describe('TodolistbodyComponent', () => {
  let component: TodolistbodyComponent;
  let fixture: ComponentFixture<TodolistbodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodolistbodyComponent]
    });
    fixture = TestBed.createComponent(TodolistbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
