<template>
  <div class="NoteEdit">
    <div class="NoteEdit__title">
      <span>Заголовок: </span>
      <input type="text" v-model="note.title" :class="{ invalid: !note.title }" />
    </div>

    <div class="TodoList">
      <div
        class="TodoItem"
        v-for="todo in note.todos"
        :key="todo.id"
        :class="{ checked: todo.checked === true }"
      >
        <input type="checkbox" v-model="todo.checked" />
        <input :disabled="todo.checked" type="text" v-model="todo.text" />
        <button @click.prevent="deleteTodo(todo.id)">❌</button>
      </div>
    </div>

    <div class="addTodo">
      <input
        placeholder="Добавьте задачу"
        type="text"
        @keyup.enter="addTodo"
        v-model="newTodo.text"
      />
      <button :disabled="!newTodo.text" @click="addTodo">Добавить</button>
    </div>
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
  }
}
</script>

<style lang="scss">
.NoteEdit {
  &__title{
    display: flex;
    align-items: center;
    font-size: 2rem;
  }
  input {
    font-size: 2.5rem;
    margin: 10px;
  }
}

.TodoItem {
  display: flex;
  align-items: center;
}

.addTodo{
  display: flex;
  align-items: center;
}
.invalid{
  border: 2px solid #dc3545;
  position: relative;
}
</style>
