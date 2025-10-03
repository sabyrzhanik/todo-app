import {
	getFromLocalStorage,
	saveToLocalStorage,
} from './helpers/localStorageHelpers.js'
import { createElement } from './helpers/domHelpers.js'

const textField = document.querySelector('.input-field')
const addTodoBtn = document.querySelector('.add-todo-btn')
const todoContainer = document.querySelector('.todo-container')

const todoList = getFromLocalStorage('todos') || []

addTodoBtn.addEventListener('click', () => {
	if (textField.value.trim() !== '') {
		todoList.push(textField.value)
		textField.value = ''

		saveToLocalStorage('todos', todoList)
		render()
	}
})

const removeTodo = (index) => {
	todoList.splice(index, 1)
	saveToLocalStorage('todos', todoList)
	render()
}

const render = () => {
	todoContainer.innerHTML = ''
	todoList.forEach((todo, index) => {
		const todoEl = createElement('li', todo)
		const removeEl = createElement('button', '❌')

		removeEl.addEventListener('click', () => removeTodo(index))

		todoEl.append(removeEl)
		todoContainer.append(todoEl)
	})
}

render()
