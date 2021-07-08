<template>
  <div>
    <input type="text" v-model="note.title" />
    <div v-if="note.todos.length">
      <div v-for="todo in note.todos" :key="todo.id" :class="{ checked: todo.checked === true }">
        <input type="checkbox" v-model="todo.checked" />
        <input :disabled="todo.checked" type="text" v-model="todo.text" />
        <button @click.prevent="deleteTodo(todo.id)">delete</button>
      </div>
    </div>
    <div v-else>Заполните данные о задачах</div>
    <input type="text" @keyup.enter="addTodo" v-model="newTodo.text" />
  </div>
</template>

<script>
export default {
  name: 'NoteEditItem',
  data() {
    return {
      newTodo: {
        text: '',
        checked: false
      }
    }
  },
  props: {
    note: Object
  },
  computed: {
    newTodoId() {
      if (this.note.todos.length > 0) {
        const item = this.note.todos.reduce((prev, current) =>
          +prev.id > +current.id ? prev : current
        )
        return item.id + 1
      } else {
        return 0
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.text) {
        this.note.todos.push({
          id: this.newTodoId,
          ...this.newTodo
        })
        this.newTodo.text = ''
      }

    },
    deleteTodo(id) {
      this.note.todos = this.note.todos.filter(todo => todo.id !== id)
    }
  },
}
</script>
