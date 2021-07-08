import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {

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

        if(note.title){
          return { ...note, id }
        }else{
          return { ...note }
        }
      } catch (error) {
        throw error
      }
    },

    async createNote({ commit }, note) {
      try {
        await firebase
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
      } catch (error) {
        throw error
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

  },
  modules: {}
})
