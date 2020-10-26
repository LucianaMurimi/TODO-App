/*Global variables:
1. items -> an array of the items stored in the localStorage
2. todoitemsList -> the to do section `ul`, onto which the localStorage items will be attached/appended*/
let items = JSON.parse(localStorage.getItem('items')) || []
let todoItemsList = document.querySelector('.items ul')

/*functions:
1. addFunction ->   called by the `add` button. Adds an item to the localStorage
2. editFunction ->  called by the `edit` button. Edits an item on localStorage
3. doneFunction ->  called by the `done` button. Adds the given item to completed items on localStorage
4. deleteFunction -> called by the `delete` button. Deletes all items from localStorage
5. populateTodoList -> populates a todo list to show the items stored on localStorage*/

function addFunction () {
  //step 1. get the item to be added.
  let newItem = document.getElementById('item-id').value

  //step 2. push the new item into the array of items in localStorage
  items.push(newItem)

  //step 3. set the localStorage item
  localStorage.setItem('items', JSON.stringify(items))

  //step 4. populate it on the to do item list
  //populateTodoList(items, todoItemsList);
}
function populateTodoList (arr, ul) {
  for (let i in arr) {
    let li = document.createElement('li')
    li.innerHTML = `
            <label>${arr[i]}</label>
            <button class="edit">Edit Item</button> 
            <button class="done" onclick="doneFunction()">Done</button>
            `
    ul.append(li)
  }
}
populateTodoList(items, todoItemsList)

//edit items

//get the unordered list
let ul = document.querySelector('.task-list')

//set up an event listener on the unordered list that triggers on click
ul.addEventListener('click', change => {
  if (change.target.tagName === 'BUTTON') {
    const btn = change.target
    const li = btn.parentNode
    const ul = li.parentNode

    if (btn.textContent === 'Edit Item') {
      const label = li.firstElementChild
      const input = document.createElement('input')
      input.type = 'text'
      input.value = label.textContent
      li.insertBefore(input, label)
      li.removeChild(label)
      btn.textContent = 'save'
    } else if (btn.textContent === 'save') {
      const input = li.firstElementChild
      const label = document.createElement('label')
      label.textContent = input.value
      li.insertBefore(label, input)
      li.removeChild(input)
      btn.textContent = 'Edit Item'
    }
  }
})
