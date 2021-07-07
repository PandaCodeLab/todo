import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [
      {
        id: 1,
        title: 'Заголовок 1',
        todos: [
          {
            id: 0,
            text: 'Сделать 1',
            checked: false
          },
          {
            id: 1,
            text: 'Сделать 2',
            checked: false
          },
          {
            id: 2,
            text: 'Сделать 3',
            checked: false
          }
        ]
      },
      {
        id: 2,
        title: 'Заголовок 2',
        todos: [
          {
            id: 0,
            text: 'Сделать 1',
            checked: false
          },
          {
            id: 1,
            text: 'Сделать 2',
            checked: false
          },
          {
            id: 2,
            text: 'Сделать 3',
            checked: false
          }
        ]
      }
    ]
  },
  mutations: {
    CREATE_NOTE: (state, note) => {
      state.notes.push(note)
    },
    UPDATE_NOTE: (state, note) => {
      const index = state.notes.findIndex(n => n.id === note.id)
      state.notes[index] = {
        ...note
      }
    },
    DELETE_NOTE: (state, noteId) => {
      state.notes = state.notes.filter(n => n.id !== noteId)
    }
  },
  actions: {
    createNote: ({ commit }, note) => commit('CREATE_NOTE', note),
    updateNote: ({ commit }, note) => commit('UPDATE_NOTE', note),
    deleteNote: ({ commit }, noteId) => commit('DELETE_NOTE', noteId)
  },
  getters: {
    findNoteById: state => id => state.notes.find(n => n.id === id),
    getNoteMaxId: state => {
      if (state.notes.length > 0) {
        const item = state.notes.reduce((prev, current) =>
          +prev.id > +current.id ? prev : current
        )
        return item.id + 1
      } else {
        return 0
      }
    }
  },
  modules: {}
})
