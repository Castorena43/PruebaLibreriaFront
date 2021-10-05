import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Libros from '../views/Libros.vue'
import CreateLibro from '../views/CreateLibro.vue'
import NotFound from '../views/NotFound.vue'
import Registro from '../views/Registro.vue'

const routes = [
  {
    path: '/',
    name: 'Libros',
    component: Libros,
    meta: { auth: true}
  },
  {
    path: '/create',
    name: 'CreateLibro',
    component: CreateLibro,
    meta: { auth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: { auth: false }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(route => route.meta.auth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
});


export default router
