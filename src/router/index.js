import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExchangesView from '../views/ExchangesView.vue'
import TrendView from '../views/Trend.vue'
import CategoryView from '../views/Category.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/exchanges',
      name: 'exchanges',
      component: ExchangesView
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    }
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router
