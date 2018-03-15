import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/pages/list'
import SignUp from '@/pages/signUp'
import SignIn from '@/pages/signIn'
import ArticleCreate from '@/pages/article/create'
import ArticleList from '@/pages/list'
import ArticleShow from '@/pages/article/index'
import ArticleEdit from '@/pages/article/edit'
import User from '@/pages/user/index'
import Followee from '@/pages/user/followee'
import Follower from '@/pages/user/follower'
import Friend from '@/pages/user/friend'
import Message from '@/pages/user/message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/article/create',
      name: 'ArticleCreate',
      component: ArticleCreate,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/article/:id',
      name: 'ArticleShow',
      component: ArticleShow
    },
    {
      path: '/article/:id/edit',
      name: 'ArticleEdit',
      component: ArticleEdit,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
    },
    {
      path: '/followee',
      nanme: 'Followee',
      component: Followee,
      meta: {
       needLogin: true
      }
    },
    {
      path: '/follower',
      nanme: 'Follower',
      component: Follower,
      meta: {
       needLogin: true
      }
    },
    {
      path: '/friend',
      name: 'Friend',
      component: Friend,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/message',
      nanme: 'Message',
      component: Message,
      meta: {
       needLogin: true
      }
    },
  ]
})
