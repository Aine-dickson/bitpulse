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
        { 
            path: '/services',
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
        { 
            path: '/blogs',
            name: 'blog',
            component: () => import('@/views/blog.vue'),
            meta: {
                title: 'Blog',
                requiresAuth: false,
            },
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
            meta: {
                title: 'Careers',
                requiresAuth: false,
            },
        },
        { 
            path: '/contacts',
            name: 'contacts',
            component: () => import('@/views/contacts.vue'),
            meta: {
                title: 'Contacts',
                requiresAuth: false,
            },
        },
        {
            path: '/why-bitpulse',
            name: 'why_bitpulse',
            component: () => import('@/views/whyBitpulse.vue'),
        },
        {
            path: '/innovations',
            name: 'innovations',
            component: () => import('@/views/innovations.vue'),
            children: [
                {
                    path: 'smarter-cities',
                    name: 'smarter_cities',
                    component: () => import('@/components/innovations/smarterCities.vue'),
                },
                {
                    path: 'health-tech',
                    name: 'health_tech',
                    component: () => import('@/components/innovations/healthTech.vue'),
                },
                {
                    path: 'fintech',
                    name: 'fintech',
                    component: () => import('@/components/innovations/digitalEconomies.vue'),
                },
                {
                    path: 'education',
                    name: 'education',
                    component: () => import('@/components/innovations/education.vue'),
                },
                {
                    path: 'developer-tools',
                    name: 'developer_tools',
                    component: () => import('@/components/innovations/devTools.vue'),
                },
                {
                    path: 'embedded-systems',
                    name: 'embedded_systems',
                    component: () => import('@/components/innovations/embeddedSystems.vue'),
                },
            ]
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

// Fallback title for routes that don't call useSeoMeta themselves.
// Pages that use useSeoMeta (via @unhead) will override this on mount.
router.afterEach((to) => {
    if (typeof document === 'undefined') return
    const title = to.meta?.title as string | undefined
    document.title = title ? `${title} · BitPulse` : 'BitPulse — Embedded, Firmware & Systems Software'
})

export default router
