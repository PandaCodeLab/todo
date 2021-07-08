import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    /*     CREATE_NOTE: (state, note) => {
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
    } */
  },
  actions: {
    async fetchNotes({ commit }) {
      try {
        const notes =
          (
            await firebase
              .database()
              .ref(`/notes`)
              .once('value')
          ).val() || {}

        return Object.keys(notes).map(key => ({ ...notes[key], id: key }))
      } catch (error) {
        throw error
      }
    },

    async fetchNoteById({ commit }, id) {
      try {
        const note =
          (
            await firebase
              .database()
              .ref(`/notes`)
              .child(id)
              .once('value')
          ).val() || {}

        return { ...note, id }
      } catch (error) {
        throw error
      }
    },

    async createNote({ commit }, note) {
      try {
        const note = await firebase
          .database()
          .ref(`/notes`)
          .push(note)

        return {...note}
      } catch (error) {
        throw error
      }
    },

    async updateNote({ commit }, note) {
      try {
        return await firebase
          .database()
          .ref(`/notes`)
          .child(note.id)
          .update({ ...note })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async deleteNote({ commit }, id) {
      try {
        await firebase
          .database()
          .ref(`/notes`)
          .child(id)
          .remove()
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    /*     findNoteById: state => id => state.notes.find(n => n.id === id),
    getNoteMaxId: state => {
      if (state.notes.length > 0) {
        const item = state.notes.reduce((prev, current) =>
          +prev.id > +current.id ? prev : current
        )
        return item.id + 1
      } else {
        return 0
      }
    } */
  },
  modules: {}
})
