import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Simon from '@/components/Simon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/simon',
      name: 'Simon',
      component: Simon
    }
  ]
})
