<template>
  <div>
    <div v-if="noteFound">
      <h1 class="page-title">Редактирование заметки</h1>
      <div>
        <input type="text" v-model="note.title" />
        <div v-if="note.todos.length">
          <div
            v-for="todo in note.todos"
            :key="todo.id"
            :class="{ checked: todo.checked === true }"
          >
            <input type="checkbox" v-model="todo.checked" />
            <input :disabled="todo.checked" type="text" v-model="todo.text" />
            <button @click.prevent="deleteTodo(todo.id)">delete</button>
          </div>
        </div>
        <div v-else>Дел нет</div>
        <input type="text" @keyup.enter="addTodo" v-model="newTodo.text" />
      </div>

      <div class="NoteEdit-options">
        <button @click="updateNoteLocal" :disabled="!stateChanged">Сохранить изменения</button>
        <button @click="editCancelModal">Отменить редактирование</button>
        <button @click="deleteNoteModal">Удалить заметку</button>
      </div>
    </div>
    <div v-else>
      <h1 class="page-title">Заметка не найдена</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoEdit',
  data() {
    return {
      note: {
        id: +this.$route.params.id,
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
  computed: {
    ...mapGetters(['findNoteById']),
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
    ...mapActions(['updateNote', 'deleteNote']),
    updateNoteLocal() {
      this.updateNote(this.note)
      this.stateChanged = false
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
    },
    editCancelModal() {
      this.$modal.show('dialog', {
        title: 'Отменить редактирование?',
        //text: 'Lorem ipsum dolor sit amet, ...',
        buttons: [
          {
            title: 'Нет',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Да',
            handler: () => {
              this.$router.push('/')
            }
          }
        ]
      })
    },
    deleteNoteModal() {
      this.$modal.show('dialog', {
        title: 'Удалить заметку?',
        //text: 'Lorem ipsum dolor sit amet, ...',
        buttons: [
          {
            title: 'Нет',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Да',
            handler: () => {
              this.deleteNote(+this.$route.params.id)
              console.log(+this.$route.params.id)
              this.$modal.hide('dialog')
              this.$router.push('/')
            }
          }
        ]
      })
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
  mounted() {
    if (this.noteFound) {
      this.note = JSON.parse(JSON.stringify(this.noteFound))
    }
  }
}
</script>

<style scoped lang="scss">
.checked {
  text-decoration: line-through;
}
</style>
