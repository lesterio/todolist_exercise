import { Todoitem } from './../todoitem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoItems : Todoitem[] = [];
  index : number = 0 ;
  constructor() { }
  clearItems = () => this.todoItems = [];
  setItems = (items : Todoitem[])  => {
    this.todoItems = items
    this.todoItems.forEach(item=>{
      this.index = item.id > this.index ? item.id : this.index
    })
  };
  addItem = (desc : string) =>{
    if( desc !== '') this.todoItems.push({ id : this.index++ , itemDesc : desc , isCompelete : false})
  }

  //在想說這樣應該可以？
  updateItem = ( data : Todoitem) => {
    let findIndex = this.todoItems.findIndex(item=>item.id=== data.id)
    if(findIndex > -1) this.todoItems[findIndex] = data
  }
  updateItemState(id :number , state : boolean){
    let findIndex = this.todoItems.findIndex(item=>item.id===id)
    if(findIndex > -1) this.todoItems[findIndex].isCompelete = state
  }
  updateItemDescription(id : number , description : string){
    let findIndex = this.todoItems.findIndex(item => { item.id === id  })
    if(findIndex !== null) this.todoItems[findIndex].itemDesc = description
  }

  removeItem = (data : Todoitem) => this.todoItems = this.todoItems.filter( item => item !== data)
  getItemByStateCount = (compelete : boolean) => this.todoItems.filter( item => item.isCompelete===compelete).length;
  getCompleteItemCount = () => { return this.todoItems.filter( item => item.isCompelete===true).length; }
  getProcessingItemCount = () => { return this.todoItems.filter( item => item.isCompelete===false).length; }
  getItems = () => this.todoItems;
  getCompleteItems = () => this.todoItems.filter(t => t.isCompelete=== true);
  getProcessingItems = () => this.todoItems.filter(t => t.isCompelete=== false);
  setItemsState = (state:boolean) => this.todoItems.forEach(item=>item.isCompelete = state)
  getItemsByState(state : string){
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
}
