import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from "../utils/cookie";
import Home from '../components/loginAndRegister/Home'
import Load from '../components/loginAndRegister/Load'
import Login from '../components/loginAndRegister/Login'
import Register from '../components/loginAndRegister/Register'
import Course from '../components/mainWindow/course/Course'
import Chat from '../components/mainWindow/course/Chat'
import Question from '../components/mainWindow/course/Question'

Vue.use(Router)

const vueRouter = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/load',
          name: 'Load',
          component: Load
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
        },
        {
          path: '/course',
          name: 'Course',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Course
        },
        {
          path: '/chat',
          name: 'Chat',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Chat
        },
        {
          path: '/question',
          name: 'Question',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Question
        }
      ],
      redirect:'/load'
    }
  ]
})

export default vueRouter

vueRouter.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (getCookie("userEmail") != null) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/',
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})
