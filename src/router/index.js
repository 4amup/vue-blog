import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/pages/List'
import SignUp from '@/pages/signUp'
import SignIn from '@/pages/signIn'
import ArticleCreate from '@/pages/article/create'
import ArticleList from '@/pages/List'
import ArticleShow from '@/pages/article/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/article/create',
      name: 'ArticleCreate',
      component: ArticleCreate,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/article',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      name: 'ArticleShow',
      component: ArticleShow
    },
  ]
})
