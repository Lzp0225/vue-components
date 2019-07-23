import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Draggable',
      component: () => import('@/components/Draggable.vue')
    },
    {
      path: '/Three',
      name: 'Three',
      component: () => import('@/components/Three.vue')
    }
  ]
})
