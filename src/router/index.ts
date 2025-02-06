import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '../views/editor/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/editor',
      component: () => import('@/layouts/index.vue'),
      children: [
        {
          path: '/editor',
          name: 'editor',
          component: EditorView,
        },
      ],
    },
  ],
})

export default router
