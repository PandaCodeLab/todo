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
            id: 1,
            text: 'Сделать 1',
            checked: false
          },
          {
            id: 2,
            text: 'Сделать 2',
            checked: false
          },
          {
            id: 3,
            text: 'Сделать 3',
            checked: false
          },
        ]
      },
      {
        id: 2,
        title: 'Заголовок 2',
        todos: [
          {
            id: 1,
            text: 'Сделать 1',
            checked: false
          },
          {
            id: 2,
            text: 'Сделать 2',
            checked: false
          },
          {
            id: 3,
            text: 'Сделать 3',
            checked: false
          },
        ]
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    findNoteById: (state) => id => state.notes.find(n => n.id === id),
  },
  modules: {}
})
