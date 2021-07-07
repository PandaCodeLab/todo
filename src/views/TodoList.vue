<template>
  <div class="NoteList">
    <div class="NoteItem" v-for="note in notes" :key="note.id">
      <div class="NoteItem__title">{{ note.title }}</div>
      <div class="TodoList">
        <div class="TodoListItem" v-for="todo in note.todos" :key="todo.id">
          <input type="checkbox" class="TodoListItem__checkbox">
          <div class="TodoListItem__text">{{ todo.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['notes'])
  },
  mounted() {
    console.log(this.notes);
  }
}
</script>

<style lang="scss"></style>
