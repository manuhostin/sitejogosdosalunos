import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Game from '../views/GameView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/GameView/:id', component: Game },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
