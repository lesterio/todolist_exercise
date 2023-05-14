import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todoitem } from 'src/todoitem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolistbody',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todolistbody.component.html',
  styleUrls: ['./todolistbody.component.css']
})
export class TodolistbodyComponent {
  itemDesc = ''
  todoitems : Todoitem[] = [
    { itemDesc : '睡覺' , isCompelete : false},
    { itemDesc : '吃早餐' , isCompelete : true},
    { itemDesc : '吃午餐' , isCompelete : false},
    { itemDesc : '吃晚餐' , isCompelete : false},
    { itemDesc : '吃宵夜' , isCompelete : false},
  ]

  clear = () => this.todoitems = []
  addItem(){
    this.itemDesc !== '' ?
      this.todoitems.push({itemDesc : this.itemDesc , isCompelete : false}):''
    this.itemDesc = ''
  }

  removeItem(data : Todoitem){
    console.log(data)
    return this.todoitems = this.todoitems.filter( item => item !== data)
  }

  //不確定怎樣的寫法比較好，再研究XD
  getItemByStatusCount = (compelete : boolean) => { return this.todoitems.filter(t => t.isCompelete===compelete).length; }
  getCompeleteItemCount = () => { return this.todoitems.filter(t => t.isCompelete===true).length; }
  getProcessingItemCount = () => { return this.todoitems.filter(t => t.isCompelete===false).length; }
}
