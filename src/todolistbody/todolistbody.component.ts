import { Component , inject ,OnInit} from '@angular/core';
import { CommonModule, NgSwitch} from '@angular/common';
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
  inputDesc = ''
  maxSeq : number = 0
  currentItem? : Todoitem //= { id : 0 , itemDesc : '' , isCompelete : false}
  //? 表示，可允許空值
  displayMode : string = 'All'
  todoItems : Todoitem[] = [];

  request = inject(HttpClient);//定義一個請求
  ngOnInit(){
    this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json').subscribe(
    (response) => {
      this.todoItems = response
      //this.todoItems = response
      //暫且做個timesCount
      this.todoItems.forEach(item=>{
        this.maxSeq = item.id > this.maxSeq ? item.id : this.maxSeq
      })
    })
  }
  clearItem = () => this.todoItems = []
  readDefaultTodoItem(){
    //Todo:用httpGet試試
    this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json').subscribe(
    (response) => {
      this.todoItems = response
      //暫且做個timesCount
      this.todoItems.forEach(item=>{
        this.maxSeq = item.id > this.maxSeq ? item.id : this.maxSeq
      })
    })
    this.todoItems = this.todoItems
  }
  clearCheckMessage = () => this.checkMessage = ''
  addItem(){
    this.maxSeq += 1
    if(this.inputDesc!=='')
      this.todoItems.push({ id : this.maxSeq , itemDesc : this.inputDesc , isCompelete : false})
    else
      this.checkMessage = '待辦事項不得為空'
    this.inputDesc = ''
  }
  removeItem(data : Todoitem){
    return this.todoItems = this.todoItems.filter( item => item !== data)
  }

  updateItemState(id :number , state : boolean){
    let index = this.todoItems.findIndex(item=>item.id===id)
    if(index > -1) this.todoItems[index].isCompelete = state
  }
  updateItemDescription(id : number , description : string){
    let index = this.todoItems.findIndex(item => { item.id === id  })
    if(index !== null) this.todoItems[index].itemDesc = description
  }

  setItemState(state:boolean){
    this.todoItems.forEach(item=>item.isCompelete = state)
  }

  //不確定怎樣的寫法比較好，再研究XD
  getItemByStateCount = (compelete : boolean) => {
     return this.todoItems.filter(t => t.isCompelete===compelete).length; }
  getCompeleteItemCount = () => { return this.todoItems.filter(t => t.isCompelete===true).length; }
  getProcessingItemCount = () => { return this.todoItems.filter(t => t.isCompelete===false).length; }

  getItems = () => this.todoItems;
  getCompelteItems() {
    let current : Todoitem[] = [];
    current = this.todoItems.filter(t => t.isCompelete=== true);
    return current;
  }
  getProcessingItems() {
    let current : Todoitem[] = [];
    current = this.todoItems.filter(t => t.isCompelete=== false);
    return current;
  }

  //先留著這種想法，但在這次好像不太適合。
  //好像也可以用enum?
   getItemsByState(state : string |'All'|'Active'|'Completed'){
    //console.log(state)
    let current :Todoitem[] = [];
     switch(state){
      case 'All':
        current = this.todoItems;
        break;
       case 'Active':
        current = this.todoItems.filter(t => t.isCompelete=== false);
        break;
       case 'Completed':
        current = this.todoItems.filter(t => t.isCompelete===true);
        break;
       default:
        current = this.todoItems
     }
     return current;


   }


  //todo : 什麼叫pure function?還是感覺不太出來，待研究。
  //目前的理解是，input是什麼，相對應的output就應該固定的
  //可是，在寫程式的時候，常常就是會用到共用變數不是嗎？  那這樣不就會變影響到了？
  // eg : getItemByStateCount(boolean) ，但實際應該要把整個array丟進來？ getItemByStateCount(Todoitems[],boolea)?
  //這樣感覺是肥大耶(?!)
}
