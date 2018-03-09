import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/pages/List'
import SignUp from '@/pages/signUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
