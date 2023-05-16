import { Component , inject} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Todoitem } from 'src/todoitem';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-todolistbody',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todolistbody.component.html',
  styleUrls: ['./todolistbody.component.css'],
  inputs : [  ],
  providers : []
})
export class TodolistbodyComponent{
  service = inject(TodoService)
  checkMessage = ''
  inputDesc = ''
  displayMode : string = 'All'
  request = inject(HttpClient);//定義一個請求

  clearItem = () => this.service.clearItems()
  readDefaultTodoItem(){
    this.request.get<Todoitem[]>('http://localhost:4200/assets/data/todoitems.json').subscribe(
    (response) => {
      this.service.setItems(response)
    })
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
  updateItemDescription = (id : number , description : string) => this.service.updateItemDescription(id,description)
  setItemsState = (state:boolean) => this.service.setItemsState(state)
  getCompeleteItemCount = () => this.service.getCompleteItemCount();
  getProcessingItemCount = () => this.service.getProcessingItemCount();
  getItems = () => this.service.getItems();
  getCompleteItems =() => this.service.getCompleteItems();
  getProcessingItems = () => this.service.getProcessingItems();
  //先留著這種想法，但在這次好像不太適合。
  //好像也可以用enum?
   getItemsByState = (state : string ) => this.service.getItemsByState(state);

  //todo : 什麼叫pure function?還是感覺不太出來，待研究。
  //目前的理解是，input是什麼，相對應的output就應該固定的
  //可是，在寫程式的時候，常常就是會用到共用變數不是嗎？  那這樣不就會變影響到了？
  // eg : getItemByStateCount(boolean) ，但實際應該要把整個array丟進來？ getItemByStateCount(Todoitems[],boolea)?
  //這樣感覺是肥大耶(?!)
}
