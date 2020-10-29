/*Global variables:
1. items -> an array of the todo items stored in the localStorage
2. todoitemsList -> the to do section `ul`, onto which the localStorage items will be attached/appended*/
let items = JSON.parse(localStorage.getItem('items')) || [];
let todoItemsList = document.querySelector('.items ul');

/*3. completedItems -> an array of completed todo items stored in the localStorage
4. completedItemsList -> the completed item section `ul`*/
let completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];
let completedItemsList = document.querySelector('.completed-items ul');

/*functions:
1. addFunction ->   called by the `add` button. Adds an item to the localStorage
2. doneFunction ->  called by the `done` button. Adds the given item to completed items on localStorage
3. deleteFunction -> called by the `delete` button. Deletes all items from localStorage
4. populateTodoList -> populates a todo list to show the items stored on localStorage*/

function addFunction () {
  //step 1. get the item to be added.
  let newItem = document.getElementById('item-id').value

  if(newItem) {
  //step 2. if the newItem is not null, create the newItemObj
    let newItemObj = {
      id: new Date().getTime(),
      item: newItem
    }
    //step 3. push the newItemObj into an array of objects in localStorage
    items.push(newItemObj);

    //step 4. set the localStorage items
    localStorage.setItem('items', JSON.stringify(items));
  }
}

function populateTodoList (arr, ul) {
  if(arr) {
    for (let i in arr) {
      let li = document.createElement('li');
      li.setAttribute("id", `${arr[i].id}`);
      li.innerHTML = (`
              <label>${arr[i].item}</label>
              <div>
              <button class="edit">Edit Item</button> 
              <button class="delete" onclick="deleteItemFunction()">Delete</button>
              <button class="done" onclick="doneFunction()">Done</button>
              </div>
              `);
          ul.append(li);
        }
  }
}

/*
===============================================================================
edit items*/

//get the unordered task list
let ul = document.querySelector('.task-list')

//set up an event listener on the unordered list that triggers on click
ul.addEventListener('click', change => {
  if (change.target.tagName === 'BUTTON') {
    const btn = change.target
    const div = btn.parentNode
    const li = div.parentNode
    const ul = li.parentNode

    li.classList.add("editMode");
    if (btn.textContent === 'Edit Item') {
      const label = li.firstElementChild
      const input = document.createElement('input')
      input.type = 'text'
      input.value = label.textContent
      li.insertBefore(input, label)
      li.removeChild(label)
      btn.classList.remove('edit')
      btn.classList.add('save')
      btn.textContent = 'Save'
    } else if (btn.textContent === 'Save') {
      const input = li.firstElementChild
      const label = document.createElement('label')
      label.textContent = input.value
      li.insertBefore(label, input)
      li.removeChild(input)
      btn.classList.remove('save')
      btn.classList.add('edit')
      btn.textContent = 'Edit Item'
      li.classList.remove("editMode")

      //creating a variable to hold the edited item
      let editItem = input.value;
      
      //creating a variable to hold the id of the specific element being edited
      let editItemID = li.id;
      
      //creating the new edited object
      let newEditedObj = {
        id: editItemID,
        item: editItem
      }
      //replacing this editedItem in the items array using splice method
      let arrIndex = items.findIndex(element => element.id == editItemID);
      items.splice(arrIndex, 1, newEditedObj); //from the arrIndex, remove 1 element and replace it with the new edited element

      //finally, reseting the localStorage to reflect the changes
      localStorage.removeItem('items');
      localStorage.setItem('items', JSON.stringify(items));
    }
  }
})

/*
===============================================================================
completed items*/
function doneFunction() {
  //step 1. get the specific todo that is done
  let currentListItem = this.event.currentTarget.closest("li");
  let completedItemID = currentListItem.id;
  let completedItem = items.filter(element => element.id == completedItemID);

  //step 2. push it onto the completedItems array and set the `completedItems` localStorage
  completedItems.push(completedItem[0]);
  localStorage.setItem('completedItems', JSON.stringify(completedItems));
  
  //step 3. remove that specific task from the todo `items`
  arrIndex = items.findIndex(element => element.id == completedItemID);
  items.splice(arrIndex, 1);
  
  location.reload();
  
  //step 4. reset the `items` localStorage to reflect only the remaining todos
  localStorage.removeItem('items');
  localStorage.setItem('items', JSON.stringify(items));
}

function populateCompletedItems(arr, ul) {
  if(arr) {
    for (let i in arr) {
      let li = document.createElement('li')
      li.innerHTML = (`
              <li>
                  <label>${arr[i].item}</label> 
              </li>
              `);
          ul.append(li);
        }
  }
}

/*
===============================================================================
delete all -> clearing the localStorage*/
function deleteFunction() {
  //document.querySelector("ul").innerHTML = "";
  
  //step 1. get the items stored in localStorage
  window.localStorage.clear();
  //step 2. reload to reflect changes
  location.reload();
  
}

//populate the lists
populateTodoList(items, todoItemsList);
populateCompletedItems(completedItems, completedItemsList);
