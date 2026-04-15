import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Game from '../views/GameView.vue'
import TopProjects from '../views/TopProjectsView.vue'
import Favorites from '../views/FavoritesView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/GameView/:id', component: Game },
  { path: '/top-projetos', component: TopProjects },
  { path: '/favoritos', component: Favorites },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
