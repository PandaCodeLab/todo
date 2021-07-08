import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteList from '../views/NoteList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: NoteList
  },
  {
    path: '/create/',
    name: 'NoteCreate',
    component: () => import(/* webpackChunkName: "NoteEdit" */ '../views/NoteEdit')
  },
  {
    path: '/edit/:id',
    name: 'NoteEdit',
    component: () => import(/* webpackChunkName: "NoteEdit" */ '../views/NoteEdit')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
