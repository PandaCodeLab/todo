<template>
  <div class="NoteList" v-if="notes.length">
    <div class="NoteItem" v-for="note in notes" :key="note.id" @click="editNote(note.id)">
      <div class="NoteItem__title">{{ note.title }}</div>
      <div class="TodoList">
        <div
          :class="{ checked: todo.checked === true }"
          class="TodoListItem"
          v-for="todo in note.todos.slice(0, 3)"
          :key="todo.id"
        >
          <input type="checkbox" disabled class="TodoListItem__checkbox" v-model="todo.checked" />
          <div class="TodoListItem__text">{{ todo.text }}</div>
        </div>
      </div>
      <button class="NoteItem__delete" @click.stop="deleteNoteModal(note.id)">
        Удалить заметку ❌
      </button>
    </div>
  </div>
  <div v-else style="font-size: 5rem">Заметок нет</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      notes: []
    }
  },
  computed: {
    todosLimited() {
      return this.notes.todos.slice(0, 3)
    }
  },
  methods: {
    ...mapActions(['deleteNote', 'fetchNotes']),
    editNote(id) {
      this.$router.push(`/edit/${id}`)
    },
    deleteNoteModal(noteId) {
      this.$modal.show('dialog', {
        title: 'Удалить заметку?',
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
              this.deleteNote(noteId)
              this.notes = this.notes.filter(n => n.id !== noteId)
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  },
  async mounted() {
    this.notes = await this.$store.dispatch('fetchNotes')
  }
}
</script>

<style lang="scss">
.NoteList {
  display: flex;
  justify-content: flex-start;
  padding: 4rem 0 0;
  flex-wrap: wrap;
}

.NoteItem {
  padding: 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.5s ease;
  font-size: 2rem;
  border: 2px solid #000;
  margin-right: 4rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  &__delete {
    margin-top: auto;
    cursor: pointer;
  }
}

.NoteItem:hover {
  box-shadow: 0 0 25px #000;
}

.TodoList {
  margin: 1.5rem 0;
}

.TodoListItem {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
