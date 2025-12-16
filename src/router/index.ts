import { createRouter, createWebHistory } from 'vue-router'
import CoverageLabView from '@/views/CoverageLabView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'lab', component: CoverageLabView },
  ],
})

export default router
