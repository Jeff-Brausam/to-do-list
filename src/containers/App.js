import React, { Component } from 'react';
import List from '../components/List/List'
import Cockpit from '../components/Cockpit/Cockpit' 
import './App.css';

class App extends Component {
  state = {
    items: [],
    text: '',
    listHasItems: false,
  }

  textChangeHandler = (event) => {
    // Mutate and store the temp text
      const tempText = event.target.value;
    
    // Update the text state
      this.setState({text: tempText});
  }

  editChangeHandler = (event, id) => {
    // Find the index of the item by the id
      const itemIndex = this.state.items.findIndex(item => {
        return item.id === id;
      });
    
    // Get the item inside of the list
      const item = {
        ...this.state.items[itemIndex]
      };
      
    // Mutate and store the temp text
      const tempText = event.target.value;

    // This items text  is equal to what is being typed into the edit input field
      item.text = tempText;
      
    // Get the list
      const tempList = [...this.state.items];
    
    // Set the item in the list
      tempList[itemIndex] = item;

    // If there is no value anymore, (user backspaces everything, then delete the todo)
      if (event.target.value === '')
        return this.removeItemHandler();

    // Update your list
      this.setState({items: tempList, text: ''}); 

    // Update on localstorage
      window.localStorage.setItem('items', JSON.stringify(tempList));
  }


  addItemHandler = (e) => {
    e.preventDefault();
    // If there is no text value, return, do not add empty items.
      if (this.state.text === ''){
        return;
      }
    // Create a new item
      const newItem = {text: this.state.text, id: Date.now(), complete: false, editing: false};
    
    // Copy the current items for mutation
      const tempList = [...this.state.items];
    
    // Add mutated item to the array
      tempList.push(newItem);
    
    // Update the state, clear the text
      this.setState({items: tempList, text: '', listHasItems: true}); 
    
    // Update on localstorage
      window.localStorage.setItem('items', JSON.stringify(tempList));
    }

  removeItemHandler = (id) => {
    // Find the index of the item by the id
      const itemIndex = this.state.items.findIndex(item => {
        return item.id === id;
      });
    
    // Create a list reference to be mutated
      const tempList = [...this.state.items];
    
    // Remove the item from the list at the id
      tempList.splice(itemIndex, 1);
      
    // Update your list, reset the items state
      this.setState({items: tempList});
    
    // Save to localStorage
      window.localStorage.setItem('items', JSON.stringify(tempList));
  }

  completeItemHandler = (id) => {
    // Find the index of the item by the id
      const itemIndex = this.state.items.findIndex(item => {
        return item.id === id;
      });

    // Get the item inside of the list
      const item = {
        ...this.state.items[itemIndex]
      };
    
    // Switch between complete and not complete
      item.complete = !item.complete;
    
    // Get the list
      const tempList = [...this.state.items];
    
    // Set the item in the list
      tempList[itemIndex] = item;
    
    // Update your list
      this.setState({items: tempList});      
    
    // Update the localstorage
      window.localStorage.setItem('items', JSON.stringify(tempList));
  }

  itemIsEditing = (id) => {
    // Find the index of the item by the id
      const itemIndex = this.state.items.findIndex(item => {
        return item.id === id;
      });
    
    // Get the item inside of the list
      const item = {
        ...this.state.items[itemIndex]
      };

    // Item is currently edit toggle, true or false, on or off
      item.editing = !item.editing;
  
    // Get the list
      const tempList = [...this.state.items];
    
    // Set the item in the list
      tempList[itemIndex] = item;
        
    // Update your list
      this.setState({items: tempList}); 
    
    // Update on localstorage
      window.localStorage.setItem('items', JSON.stringify(tempList));
  }

  componentDidMount() {
    // If there are items set them to get and set them to this variable
      this.documentData = JSON.parse(localStorage.getItem('items'));

    // Update list with localstorage data
      if (localStorage.getItem('items')) {
          this.setState({
          items: this.documentData,
          listHasItems: true, }); 
      }
  }

  render(){
    // If no lists exists, render nothing.
      let list = null;

    // If a list does exist or is created. Render that component.
      if (this.state.listHasItems) {
        list = (
          <ul>
              <List 
                items={this.state.items}
                text={this.state.text} 
                delete={this.removeItemHandler}
                edittoggle={this.itemIsEditing}
                change={this.editChangeHandler}
                complete={this.completeItemHandler}
                />
          </ul>)
      }
    return (
      <div className="App">
        <Cockpit
          submit={this.addItemHandler}
          change={this.textChangeHandler}
          value={this.state.text}  
          check={this.maxCharCheck}
          />
        {list} 
      </div>
    );
  }
}

export default App;
