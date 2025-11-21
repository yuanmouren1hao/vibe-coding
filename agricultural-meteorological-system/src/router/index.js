import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        name: 'Overview',
        component: () => import('@/views/Overview.vue'),
        meta: { title: '区域气象总览' }
      },
      {
        path: '/compare',
        name: 'Compare',
        component: () => import('@/views/Compare.vue'),
        meta: { title: '多农场对比' }
      },
      {
        path: '/trend',
        name: 'Trend',
        component: () => import('@/views/Trend.vue'),
        meta: { title: '历史趋势分析' }
      },
      {
        path: '/farm/:id',
        name: 'FarmDetail',
        component: () => import('@/views/FarmDetail.vue'),
        meta: { title: '农场详情' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
