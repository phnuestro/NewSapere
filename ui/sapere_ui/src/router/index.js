import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Task from '@/components/Task.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tasks',
      name: 'task',
      component: Task,
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { auth: false }
    },
  ]
});

export default router

router.beforeEach((to, from) => {
  const store = useAuthStore()
  
  if(to.meta.auth && !store.user) {
    return '/login'
  }
})