import { Component , inject ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todoitem } from 'src/todoitem';
import { FormsModule } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todolistbody',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todolistbody.component.html',
  styleUrls: ['./todolistbody.component.css']
})
export class TodolistbodyComponent {

  itemDesc = ''
  currentItem : Todoitem = { itemDesc : '' , isCompelete : false}
  // todoitems : Todoitem[] = [
  //   { itemDesc : '睡覺' , isCompelete : false},
  //   { itemDesc : '吃早餐' , isCompelete : true},
  //   { itemDesc : '吃午餐' , isCompelete : false},
  //   { itemDesc : '吃晚餐' , isCompelete : false},
  //   { itemDesc : '吃宵夜' , isCompelete : false},
  // ]
  todoitems : Todoitem[] = [];



  //request = inject(HttpClient) //定義一個請求
  request = inject(HttpClient);
  // ngOnInit(): void {
  //   this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json')
  //   .subscribe((data) => { this.todoitems = data })
  // }



  clearItem = () => this.todoitems = []
  readDefaultTodoItem(){
    //Todo:用httpGet試試
    this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json').subscribe(
    (data) => {
      this.todoitems = data
      console.log(data)
    })
  }
  addItem(){
    this.itemDesc !== '' ?
      this.todoitems.push({itemDesc : this.itemDesc , isCompelete : false}):''
    this.itemDesc = ''
  }

  removeItem(data : Todoitem){
    //console.log(data)
    return this.todoitems = this.todoitems.filter( item => item !== data)
  }

  //不確定怎樣的寫法比較好，再研究XD
  getItemByStatusCount = (compelete : boolean) => { return this.todoitems.filter(t => t.isCompelete===compelete).length; }
  getCompeleteItemCount = () => { return this.todoitems.filter(t => t.isCompelete===true).length; }
  getProcessingItemCount = () => { return this.todoitems.filter(t => t.isCompelete===false).length; }
}
