import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/create',
    name: 'TodoCreate',
    component: () => import(/* webpackChunkName: "TodoEdit" */ '../views/TodoCreate')
  },
  {
    path: '/edit/:id',
    name: 'TodoEdit',
    component: () => import(/* webpackChunkName: "TodoEdit" */ '../views/TodoEdit')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
