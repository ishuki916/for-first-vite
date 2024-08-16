import { createRouter, createWebHistory } from 'vue-router'
import FirstWeek from '../views/FirstWeek.vue'
import SecondWeek from '../views/SecondWeek.vue'
import ThirdWeek from '../views/ThirdWeek.vue'

const routes = [
  {
    path: '/',
    redirect: '/third-week' // 將根路徑重定向
  },
  {
    path: '/first-week',
    component: FirstWeek
  },
  {
    path: '/second-week',
    component: SecondWeek
  },
  {
    path: '/third-week',
    component: ThirdWeek
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
