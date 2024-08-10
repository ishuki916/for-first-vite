import { createRouter, createWebHistory } from 'vue-router'
import FirstWeek from '../views/FirstWeek.vue'
import SecondWeek from '../views/SecondWeek.vue'

const routes = [
  {
    path: '/first-week',
    component: FirstWeek
  },
  {
    path: '/second-week',
    component: SecondWeek
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
