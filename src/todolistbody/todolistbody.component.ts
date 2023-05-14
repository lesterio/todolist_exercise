import { Component , inject ,OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Todoitem } from 'src/todoitem';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todolistbody',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todolistbody.component.html',
  styleUrls: ['./todolistbody.component.css'],
  inputs : [  ]
})
export class TodolistbodyComponent implements OnInit {
  checkMessage = ''
  checkValue? :boolean
  inputDesc = ''
  maxSeq : number = 0
  currentItem? : Todoitem //= { id : 0 , itemDesc : '' , isCompelete : false}
  //? 表示，可允許空值
  todoitems : Todoitem[] = [];
  request = inject(HttpClient);//定義一個請求
  ngOnInit(){
    this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json').subscribe(
    (response) => {
      this.todoitems = response
      //暫且做個timesCount
      this.todoitems.forEach(item=>{
        this.maxSeq = item.id > this.maxSeq ? item.id : this.maxSeq
      })
    })
  }
  clearItem = () => this.todoitems = []
  readDefaultTodoItem(){
    //Todo:用httpGet試試
    this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json').subscribe(
    (response) => {
      this.todoitems = response
      //暫且做個timesCount
      this.todoitems.forEach(item=>{
        this.maxSeq = item.id > this.maxSeq ? item.id : this.maxSeq
      })
    })
  }
  clearCheckMessage = () => this.checkMessage = ''
  addItem(){
    this.maxSeq += 1
    if(this.inputDesc!=='')
      this.todoitems.push({ id : this.maxSeq , itemDesc : this.inputDesc , isCompelete : false})
    else
      this.checkMessage = '待辦事項不得為空'
    this.inputDesc = ''
  }
  removeItem(data : Todoitem){
    return this.todoitems = this.todoitems.filter( item => item !== data)
  }

  updateItemState(id :number , state : boolean){
    let index = this.todoitems.findIndex(item=>item.id===id)
    if(index > -1) this.todoitems[index].isCompelete = state
  }
  updateItemDescription(id : number , description : string){
    let index = this.todoitems.findIndex(item => { item.id === id  })
    if(index !== null) this.todoitems[index].itemDesc = description
  }

  setItemState(state:boolean){
    this.todoitems.forEach(item=>item.isCompelete = state)
  }

  //不確定怎樣的寫法比較好，再研究XD
  getItemByStatusCount = (compelete : boolean) => { return this.todoitems.filter(t => t.isCompelete===compelete).length; }
  getCompeleteItemCount = () => { return this.todoitems.filter(t => t.isCompelete===true).length; }
  getProcessingItemCount = () => { return this.todoitems.filter(t => t.isCompelete===false).length; }
}
