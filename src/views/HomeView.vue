<script setup lang="ts">
import { onMounted } from 'vue';
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})

const addTodo = () => {
  todoStore.addTodo()
}

const removeTodo = (index: number, id: string) => {
  todoStore.removeTodo(index, id)
}
</script>

<template>
  <main>
    <!-- <div>
      <input class="h-10" v-model="todoState.volatile" />
      <button @click="addTodo">Add</button>
    </div>
    <div v-for="(todo, index) of todoState.todos" :key="todo.id">
      <div style="display: flex; align-items: center;">
        <input type="checkbox" v-model="todo.completed" />
        <p :style="todo.completed ? 'text-decoration:line-through' : ''">{{ todo.title }}</p>
        <button @click="removeTodo(index)">X</button>
      </div>
    </div> -->
    <div class="container mx-auto my-10 w-ful">
      <h1 v-show="todoStore.allTodos.length" class="text-xl mb-4"> {{
        todoStore.completedTodos }} out of {{ todoStore.allTodos.length }} are completed</h1>
      <div class="md:w-full mx-auto">
        <div class="bg-white shadow-md border border-gray-200 rounded-lg p-6">
          <form @submit.prevent="addTodo" id="todo-form">
            <div class="flex mb-4">
              <input type="text"
                class="w-full px-4 py-2 mr-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                id="todo-input" placeholder="Add new task" required v-model="todoStore.volatile" />
              <button v-text="todoStore.loading ? 'Loading...' : 'Add'" :disabled="todoStore.loading"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
            </div>
          </form>
          <ul v-for="(todo, index) of todoStore.allTodos" :key="index">
            <div class="flex items-center justify-between">
              <label class="flex items-center flex-grow">
                <input type="checkbox" v-model="todo.completed" class="mr-5" />
                <span class="w-1/2" :style="todo.completed ? 'text-decoration: line-through' : ''">{{ todo.title
                  }}</span>
              </label>
              <div>
                <button @click="removeTodo(index, todo.id)" class="text-red-500 hover:text-red-700 mr-2 delete-btn">
                  Delete
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>