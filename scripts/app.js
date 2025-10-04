import {
	getFromLocalStorage,
	saveToLocalStorage,
} from './helpers/localStorageHelpers.js'
import { createElement } from './helpers/domHelpers.js'

const textField = document.querySelector('.input-field')
const addTodoBtn = document.querySelector('.add-todo-btn')
const todoContainer = document.querySelector('.todo-container')

const todoList = getFromLocalStorage('todos') || []

const addTodo = () => {
	if (textField.value.trim() !== '') {
		todoList.push(textField.value)
		textField.value = ''
		saveToLocalStorage('todos', todoList)
		render()
	}
}

addTodoBtn.addEventListener('click', addTodo)

textField.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		addTodo()
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
		const todoEl = createElement('li')
		const textEl = createElement('span', todo)
		textEl.classList.add('todo-text')

		const removeEl = createElement('button', '❌')
		removeEl.addEventListener('click', () => removeTodo(index))

		todoEl.append(textEl, removeEl)
		todoContainer.append(todoEl)
	})
}

render()
