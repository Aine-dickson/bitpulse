import type { RouteRecordRaw } from 'vue-router'

// ViteSSG builds the router from this array (history + scrollBehavior are set
// in main.ts). Title fallback + the deep-link restore live in main.ts too.
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: { title: 'Home', requiresAuth: false },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about.vue'),
        meta: { title: 'About', requiresAuth: false },
    },
    {
        path: '/partner',
        name: 'partnership',
        component: () => import('@/views/partnership.vue'),
        meta: { title: 'Partnership', requiresAuth: false },
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('@/views/services.vue'),
        meta: { title: 'Services', requiresAuth: false },
    },
    {
        path: '/services/:slug',
        name: 'service_detail',
        component: () => import('@/views/serviceDetail.vue'),
        props: true,
    },
    {
        path: '/blogs',
        name: 'blog',
        component: () => import('@/views/blog.vue'),
        meta: { title: 'Blog', requiresAuth: false },
    },
    {
        path: '/blogs/:slug',
        name: 'blog_post',
        component: () => import('@/components/blogPage.vue'),
        props: true,
    },
    {
        path: '/careers',
        name: 'careers',
        component: () => import('@/views/careers.vue'),
        meta: { title: 'Careers', requiresAuth: false },
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: () => import('@/views/contacts.vue'),
        meta: { title: 'Contacts', requiresAuth: false },
    },
    {
        path: '/why-bitpulse',
        name: 'why_bitpulse',
        component: () => import('@/views/whyBitpulse.vue'),
        meta: { title: 'Why BitPulse', requiresAuth: false },
    },
    {
        path: '/innovations',
        name: 'innovations',
        component: () => import('@/views/innovations.vue'),
        meta: { title: 'Sectors', requiresAuth: false },
    },
    {
        path: '/innovations/:slug',
        name: 'sector_detail',
        component: () => import('@/views/sectorDetail.vue'),
        props: true,
    },
    {
        path: '/lab',
        name: 'lab',
        component: () => import('@/views/lab.vue'),
        meta: { title: 'The Lab', requiresAuth: false },
    },
]

export default routes
