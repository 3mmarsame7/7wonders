import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

//import Wonders from '../views/Wonders.vue'
//import WonderDetails from '../views/WonderDetails.vue'
import About from '../components/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    //{
     // path: '/wonders',
     // name: 'wonders',
     // component: Wonders
    //},
    //{
    //  path: '/wonder/:id',
    //  name: 'wonder-details',
    //  component: WonderDetails,
    //  props: true
    //},
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
