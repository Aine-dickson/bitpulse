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
    {
        path: '/partner',
        name: 'partnership',
        component: () => import('@/views/partnership.vue'),
        meta: {
          title: 'Partnership',
          requiresAuth: false,
        },
    },
    { path: '/services',
        name: 'services',
        component: () => import('@/views/services.vue'),
        children: [
            {
                path: "embedded-&-iot-devt",
                name: 'embedded_iot_devt',
                component: () => import('@/components/services/embedded_iot_devt.vue'),
            },
            {
                path: "backend-&-systems",
                name: 'backend_systems',
                component: () => import('@/components/services/backend.vue'),
            },
            {
                path: "custom-R&D-prototyping",
                name: 'prototyping',
                component: () => import('@/components/services/prototyping.vue'),
            },
            {
                path: "technical-mentorship-&-training",
                name: 'training',
                component: () => import('@/components/services/training.vue'),
            },
            {
                path: "developer-tools-&-open-source-solutions",
                name: 'dev_tools',
                component: () => import('@/components/services/dev_tools.vue'),
            }
        ],
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
