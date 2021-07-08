<template>
  <div>
    <div>
      <div v-if="isEdit"><h1 class="page-title">Редактирование заметки</h1></div>
      <div v-else><h1 class="page-title">Создание заметки</h1></div>

      <NoteEditItem :note="note" />

      <div v-if="isEdit">
        <button @click="updateNoteLocal" :disabled="!stateChanged">Сохранить изменения</button>
        <button @click="editCancelModal">Отменить редактирование</button>
        <button @click="deleteNoteModal">Удалить заметку</button>
      </div>
      <div v-else>
        <button @click="createNoteLocal" :disabled="!stateChanged">Сохранить заметку</button>
      </div>
    </div>
  </div>
</template>

<script>
import NoteEditItem from '../components/NoteEditItem.vue'
import { mapActions } from 'vuex'

export default {
  name: 'TodoEdit',
  data() {
    return {
      note: {
        title: '',
        todos: []
      },
      stateChanged: false
    }
  },
  computed: {
    isEdit() {
      if (this.note.id) {
        return true
      }
    },
    isTitle() {
      return this.note.title.length > 0
    }
  },
  methods: {
    ...mapActions(['updateNote', 'deleteNote', 'createNote']),
    createNoteLocal() {
      if (this.isTitle) {
        this.createNote(this.note)
        this.$router.push('/')
      }
    },
    updateNoteLocal() {
      if (this.isTitle) {
        this.updateNote(this.note)
        this.stateChanged = false
      }
    },
    editCancelModal() {
      this.$modal.show('dialog', {
        title: 'Отменить редактирование?',
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    deleteNoteModal() {
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
              this.deleteNote(this.$route.params.id)
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
    },
    $route() {
      this.note = {title: '', todos: []}
    }
  },
  async mounted() {
    if (this.$route.name !== 'NoteCreate') {
      this.note = await this.$store.dispatch('fetchNoteById', this.$route.params.id)
      this.note.todos = []
    }
    console.log(this.note)
  },
  components: {
    NoteEditItem
  }
}
</script>

<style scoped lang="scss">
.checked {
  text-decoration: line-through;
}
</style>
