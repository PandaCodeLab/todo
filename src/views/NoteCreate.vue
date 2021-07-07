<template>
  <div>
    <h1 class="page-title">Создать заметку</h1>

    <div>
      <input type="text" v-model="note.title" />
      <div v-if="note.todos.length">
        <div v-for="todo in note.todos" :key="todo.id" :class="{ checked: todo.checked === true }">
          <input type="checkbox" v-model="todo.checked" />
          <input :disabled="todo.checked" type="text" v-model="todo.text" />
          <button @click.prevent="deleteTodo(todo.id)">delete</button>
        </div>
      </div>
      <div v-else>Дел нет</div>
      <input type="text" @keyup.enter="addTodo" v-model="newTodo.text" />
    </div>

    <div class="NoteEdit-options">
      <button @click="updateNoteLocal" :disabled="!stateChanged">Сохранить заметку</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoCreate',
  data() {
    return {
      note: {
        id: undefined,
        title: '',
        todos: []
      },
      newTodo: {
        text: '',
        checked: false
      },
      stateChanged: false
    }
  },
  mounted() {
    this.note.id = this.getNoteMaxId
  },
  computed: {
    ...mapGetters(['findNoteById', 'getNoteMaxId']),
    noteFound() {
      return this.findNoteById(+this.$route.params.id)
    },
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
    ...mapActions(['createNote']),
    updateNoteLocal() {
      this.createNote(this.note)
      this.$router.push('/')
    },
    addTodo() {
      this.note.todos.push({
        id: this.newTodoId,
        ...this.newTodo
      })
      this.newTodo.text = ''
    },
    deleteTodo(id) {
      this.note.todos = this.note.todos.filter(todo => todo.id !== id)
    }
  },
  watch: {
    note: {
      handler: function(newValue, oldValue) {
        if (JSON.stringify(newValue) === JSON.stringify(oldValue) && this.stateChanged !== true) {
          this.stateChanged = true
        }
      },
      deep: true
    }
  },
}
</script>

<style scoped lang="scss">
.checked {
  text-decoration: line-through;
}
</style>
