import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'
import { db } from '@/utils'

type Todo = {
  title: string
  completed: boolean
  id: string
}
export type TodoStoreType = {
  todos: Array<Todo>
  volatile: string
  loading: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todoState = ref<TodoStoreType>({
    todos: [],
    volatile: '',
    loading: false
  })

  async function addTodo() {
    if (!todoState.value.volatile) {
      return alert('Please first add todo title!')
    }
    try {
      todoState.value.loading = true
      const data = {
        completed: false,
        title: todoState.value.volatile
      }
      const response = await db.collection<Todo>('todos').create(data)
      todoState.value.todos.push(response)
      todoState.value.volatile = ''
    } catch (error) {
      console.log(error)
    } finally {
      todoState.value.loading = false
    }
  }
  async function removeTodo(index: number, id: string) {
    try {
      todoState.value.loading = true
      await db.collection<Todo>('todos').delete(id)
      todoState.value.todos.splice(index, 1)
    } catch (error) {
      console.log(error)
    } finally {
      todoState.value.loading = false
    }
  }

  async function fetchTodos() {
    try {
      todoState.value.loading = true
      const response: Array<Todo> = await db.collection<Todo>('todos').getFullList()
      todoState.value.todos = response
    } catch (error) {
      console.log(error)
    } finally {
      todoState.value.loading = false
    }
  }

  return { addTodo, todoState, removeTodo, fetchTodos }
})
