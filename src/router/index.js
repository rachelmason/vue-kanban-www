import Vue from 'vue'
import Router from 'vue-router'
import Boards from 'components/Boards'
import Board from 'components/Board'
import Lists from 'components/list'
import Login from 'components/login'
import Register from 'components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Boards',
      component: Boards
    }, {
      path: '/boards/:id',
      name: 'Board',
      component: Board
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
     {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
