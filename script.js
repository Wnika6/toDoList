let todoInput
let errorInfo
let addBtn
let ulList
let newTask
let popup
let popupInfo
let newTaskToEdit
let popupInput
let popupAcceptBtn
let popupCancelBtn
//global variables

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	//function that performs functions
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAcceptBtn = document.querySelector('.accept')
	popupCancelBtn = document.querySelector('.cancel')
}
//function that gets all elements

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask)
	ulList.addEventListener('click', checkBtnClick)
	popupCancelBtn.addEventListener('click', cancelPopup)
	popupAcceptBtn.addEventListener('click', changeTaskText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}
//function that gets all listeners

const addNewTask = () => {
	if (todoInput.value !== '') {
		newTask = document.createElement('li')
		// without global variable:
		// const newTask = document.createElement('li')
		newTask.textContent = todoInput.value
		crateToolsArea()
		// crateToolsArea(newTask) - variable newTask is given as parameter and will be treated as argument in crateToolsArea function
		ulList.append(newTask)
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const crateToolsArea = () => {
	//const crateToolsArea = (newTaskCreation) => {   //adding variable as argument
	const newToolsArea = document.createElement('div')
	newToolsArea.classList.add('tools')
	newTask.append(newToolsArea)
	// newTask is a global variable so appending is possible
	//newTaskCreation.append(newToolsArea)    // appending to argument

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	newToolsArea.append(completeBtn, editBtn, deleteBtn)
}

const checkBtnClick = e => {
	// e  = event
	if (e.target.matches('.complete')) {
		//or (e.target.classList.contains('complete'))
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		taskEdit(e) // event e is given as parameter and will be treated as argument in taskEdit function
	} else if (e.target.matches('.delete')) {
		//ELSE IF,not only ELSE, bc it targets only 'delete' class and not whatever we click
		deleteTask(e)
	}
}

const taskEdit = e => {
	// adding event e as an argument
	newTaskToEdit = e.target.closest('li')
	popupInput.value = newTaskToEdit.firstChild.textContent
	popup.style.display = 'flex' //bc it has display:none
}
const cancelPopup = () => {
	popup.style.display = 'none' // better use classes and not style in JS
	popupInfo.textContent = '' // clearing after eventual 'Podaj treść' error
}

const changeTaskText = () => {
	if (popupInput.value !== '') {
		newTaskToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = '' // clearing after eventual 'Podaj treść' error
	} else {
		popupInfo.textContent = 'Podaj treść'
	}
}

const deleteTask = e => {
	e.target.closest('li').remove()

	const allTasks = ulList.querySelectorAll('li') //loads existing li elements at every deleteBt click --> it creates array like element
	if (allTasks.length === 0) {
		// if array has 0 elements
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTask()
	}
}

document.addEventListener('DOMContentLoaded', main)
// SAFEGUARD - listener for page loading fully - only then scripts will start
