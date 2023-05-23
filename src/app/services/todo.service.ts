import { Todoitem } from '../../todoitem';
import { Injectable ,inject } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TodoService {
   todoItems : Todoitem[] = [];
   index : number = 0 ;

  addItem = (desc : string) =>{
    if( desc !== '') this.todoItems.push({ id : this.index++ , title : desc , completed : false , Edit : false , userId : 0})
  }

  updateItem = ( data : Todoitem) => {
    let findIndex = this.todoItems.findIndex(item=>item.id=== data.id)
    if(findIndex > -1) this.todoItems[findIndex] = data
  }
  updateItemState(id :number , state : boolean){
    let findIndex = this.todoItems.findIndex(item=>item.id===id)
    if(findIndex > -1) this.todoItems[findIndex].completed = state
  }
  updateItemEdit(id :number , state : boolean){
    let findIndex = this.todoItems.findIndex(item=>item.id===id)
    if(findIndex > -1) this.todoItems[findIndex].Edit = state
  }
  updateItemDescription(id : number , description : string){
    let findIndex = this.todoItems.findIndex( item=> item.id === id)
    if(findIndex !== null) this.todoItems[findIndex].title = description
  }
  clearItems = () => this.todoItems = [];
  setItems = (items : Todoitem[])  => {
    this.todoItems = items
    this.todoItems.forEach(item=>{
      this.index = item.id > this.index ? item.id : this.index
    })
  };
  setItemsState = (state:boolean) => this.todoItems.forEach(item=>item.completed = state)
  removeItem = (data : Todoitem) => this.todoItems = this.todoItems.filter( item => item !== data)
  getItemByStateCount = (compelete : boolean) => this.todoItems.filter( item => item.completed===compelete).length;
  getCompleteItemCount = () => { return this.todoItems.filter( item => item.completed===true).length; }
  getProcessingItemCount = () => { return this.todoItems.filter( item => item.completed===false).length; }
  getItems = () => this.todoItems;
  getCompleteItems = () => this.todoItems.filter(t => t.completed=== true);
  getProcessingItems = () => this.todoItems.filter(t => t.completed=== false);
  getItemsByState(state : string){
    let current :Todoitem[] = [];
     switch(state){
      case 'All':
        current = this.todoItems;
        break;
       case 'Active':
        current = this.todoItems.filter(t => t.completed=== false);
        break;
       case 'Completed':
        current = this.todoItems.filter(t => t.completed===true);
        break;
       default:
        current = this.todoItems
     }
     return current;
   }
}
