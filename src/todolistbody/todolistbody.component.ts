import { Component , inject} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Todoitem } from 'src/todoitem';
import { FormsModule } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todolistbody',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todolistbody.component.html',
  styleUrls: ['./todolistbody.component.css'],
  inputs : [],
  providers : []
})
export class TodolistbodyComponent{
  //endPoint = 'https://jsonplaceholder.typicode.com'
  //endPoint = '/mock'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  }
  private endpoint = `/api`
  service = inject(TodoService)
  request = inject(HttpClient)
  checkMessage = ''
  inputDesc = ''
  displayMode : string = 'All'
  onEdit = false
  clearItem = () => this.service.clearItems()
  getDefaultItem = () => {
    //this.request.get<any>(`${this.endpoint}/mock`).subscribe(
     this.request.get<Todoitem[]>(`${this.endpoint}/mock`,this.httpOptions).subscribe(
     (response) => {
      console.log(response)
      this.service.setItems(response)
     })
  }

  printItem =(item : Todoitem) => {
    console.log(item.title)
    console.log(item)
  }
  putItem = (id : number , description : string , completed : boolean) => {
    let data = {}
    this.request.post(`/api/todos`,data,this.httpOptions).subscribe({
      next : (value)=>{},
      error:(error)=>{ console.log(error)}
    })
  }
  deleteItem = ( id : number) => {
    this.request.delete(`${this.endpoint}/mock/${id}`).subscribe(
      {
        next:(response) => {console.log(response)},
        error:(error)=>{console.log(error);}
      }

      )
  }

  clearCheckMessage = () => this.checkMessage = ''
  validator = () => this.inputDesc !== '' ? '' : '待辦事項不得為空'
  addItem = () => {
    this.checkMessage = this.validator();
    if(this.checkMessage === '')this.service.addItem(this.inputDesc);
    this.inputDesc = ''
  }
  removeItem = (data : Todoitem) => this.service.removeItem(data)
  updateItemState = (id :number , state : boolean) => this.service.updateItemState(id,state)
  //updateItemEdit = ( id : number , state : boolean) => this.service.updateItemEdit(id,state)
  onEditAction = ( edit : boolean) => {
    console.log(edit)
    this.onEdit = edit
  }
  updateItemDescription = (id : number , description : string) => {
    console.log("Desc=" + description)
    this.service.updateItemDescription(id,description)
  }
  setItemsState = (state:boolean) => this.service.setItemsState(state)
  getCompeleteItemCount = () => this.service.getCompleteItemCount();
  getProcessingItemCount = () => this.service.getProcessingItemCount();
  getItems = () => this.service.getItems();
  getCompleteItems =() => this.service.getCompleteItems();
  getProcessingItems = () => this.service.getProcessingItems();
  getItemsByState = (state : string ) => this.service.getItemsByState(state);//好像也可以用enum?想要限制部份的參數才可以進來，//先留著這種想法，但在這次好像不太適合。

  //todo : 什麼叫pure function?還是感覺不太出來，待研究。
  //目前的理解是，input是什麼，相對應的output就應該固定的
  //可是，在寫程式的時候，常常就是會用到共用變數不是嗎？  那這樣不就會變影響到了？
  // eg : getItemByStateCount(boolean) ，但實際應該要把整個array丟進來？ getItemByStateCount(Todoitems[],boolea)?
  //這樣感覺是肥大耶(?!)
}
