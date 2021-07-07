<template>
  <div>
    <h1>Редактирование заметки</h1>
    <form @submit.prevent="updateNote">
      <input type="text" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TodoEdit',
  data() {
    return {
      note: {
        id: +this.$route.params.id,
        title: '',
        todos: []
      }
    }
  },
  computed: {
    ...mapGetters(['findNoteById']),
    noteFound() {
      return this.findNoteById(+this.$route.params.id)
    }
  },
  mounted() {
    this.note = { ...this.noteFound }
  }
}
</script>

<style lang="scss"></style>
