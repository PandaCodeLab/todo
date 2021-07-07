<template>
  <div class="NoteList" v-if="notes.length">
    <div class="NoteItem" v-for="note in notes" :key="note.id" @click="editNote(note.id)">
      <div class="NoteItem__title">{{ note.title }}</div>
      <div class="TodoList">
        <div class="TodoListItem" v-for="todo in note.todos.slice(0, 3)" :key="todo.id">
          <input type="checkbox" class="TodoListItem__checkbox" v-model="todo.checked" />
          <div class="TodoListItem__text">{{ todo.text }}</div>
        </div>
      </div>
      <button class="NoteItem__delete" @click.stop="deleteNoteModal(note.id)">Delete</button>
    </div>
  </div>
  <div v-else>Заметок нет</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['notes'])
  },
  methods: {
    ...mapActions(['deleteNote']),
    editNote(id) {
      this.$router.push(`/edit/${id}`)
    },
    deleteNoteModal(noteId) {
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
              this.deleteNote(noteId)
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss"></style>
