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
    if( desc !== '') this.todoItems.push({ id : this.index++ , Description : desc , Compelete : false , Edit : false})
  }

  //在想說這樣應該可以？
  updateItem = ( data : Todoitem) => {
    let findIndex = this.todoItems.findIndex(item=>item.id=== data.id)
    if(findIndex > -1) this.todoItems[findIndex] = data
  }
  updateItemState(id :number , state : boolean){
    let findIndex = this.todoItems.findIndex(item=>item.id===id)
    if(findIndex > -1) this.todoItems[findIndex].Compelete = state
  }
  updateItemEdit(id :number , state : boolean){
    let findIndex = this.todoItems.findIndex(item=>item.id===id)
    if(findIndex > -1) this.todoItems[findIndex].Edit = state
  }
  updateItemDescription(id : number , description : string){
    let findIndex = this.todoItems.findIndex(item => { item.id === id  })
    if(findIndex !== null) this.todoItems[findIndex].Description = description
  }

  removeItem = (data : Todoitem) => this.todoItems = this.todoItems.filter( item => item !== data)
  getItemByStateCount = (compelete : boolean) => this.todoItems.filter( item => item.Compelete===compelete).length;
  getCompleteItemCount = () => { return this.todoItems.filter( item => item.Compelete===true).length; }
  getProcessingItemCount = () => { return this.todoItems.filter( item => item.Compelete===false).length; }
  getItems = () => this.todoItems;
  getCompleteItems = () => this.todoItems.filter(t => t.Compelete=== true);
  getProcessingItems = () => this.todoItems.filter(t => t.Compelete=== false);
  setItemsState = (state:boolean) => this.todoItems.forEach(item=>item.Compelete = state)
  getItemsByState(state : string){
    let current :Todoitem[] = [];
     switch(state){
      case 'All':
        current = this.todoItems;
        break;
       case 'Active':
        current = this.todoItems.filter(t => t.Compelete=== false);
        break;
       case 'Completed':
        current = this.todoItems.filter(t => t.Compelete===true);
        break;
       default:
        current = this.todoItems
     }
     return current;
   }
}
