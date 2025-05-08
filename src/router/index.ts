import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
      meta: {
        title: 'Home',
        requiresAuth: false,
      },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about.vue'),
        meta: {
          title: 'About',
          requiresAuth: false,
        },
    },
    { path: '/services',
        name: 'services',
        component: () => import('@/views/services.vue'),
        meta: {
            title: 'Services',
            requiresAuth: false,
        },
    },
    { path: '/blog',
        name: 'blog',
        component: () => import('@/views/blog.vue'),
        meta: {
            title: 'Blog',
            requiresAuth: false,
        },
    },
    { path: '/careers',
        name: 'careers',
        component: () => import('@/views/careers.vue'),
        meta: {
            title: 'Careers',
            requiresAuth: false,
        },
    },
    { path: '/contacts',
        name: 'contacts',
        component: () => import('@/views/contacts.vue'),
        meta: {
            title: 'Contacts',
            requiresAuth: false,
        },
    },
  ],
})

export default router
