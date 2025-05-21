<template>
    <figure class="flex flex-col relative items-start pt-4 pb-8 sm:p-4 px-6 w-full h-full border border-yellow-500 rounded-lg">
        <div class="flex justify-center items-center w-24 h-24 rounded-lg lg:h-12 lg:w-12 bg-yellow-100 dark:bg-yellow-900">
            <img :src="image" :alt="title">
        </div>
        <blockquote class="mx-auto mt-2 text-gray-500 mb-2 dark:text-gray-400 w-full">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white my-2">{{ title }}</h3>
            <p class="text-gray-300 mb-4">{{ description }}</p>
            <ul class="">
                <li v-for="service in services" class="flex items-start mb-6 space-x-3 rtl:space-x-reverse">
                    <div class="flex items-center">
                        <div class="flex items-center justify-center w-5 h-5 rounded-full ring-white shrink-0 bg-yellow-100 dark:bg-yellow-900">
                            <svg class="w-2.5 h-2.5 text-yellow-100 dark:text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12" :class="{'text-blue-100 dark:text-blue-300': image == 'docs.svg', 'text-pink-100 dark:text-pink-300': image == 'connect.svg', 'text-indigo-100 dark:text-indigo-300': image == 'insight.svg'}">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                        </div>
                    </div>
                    <p class="">{{ service }}</p>
                </li>
            </ul>
        </blockquote>
        <div class="flex items-center absolute bottom-4 justify-center mt-3 space-x-2 rtl:space-x-reverse">
            <span @click="$router.push({name})" class="text-orange-400 font-medium hover:underline hover:text-orange-500 cursor-pointer">
                {{ cta }}
            </span>
            <svg @click="$router.push({name})" class="w-4 h-4 text-gray-800 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
        </div>
    </figure>
</template>

<script setup lang="ts">
defineProps<{title: string, description: string, services: string[], image: string, name: string, cta: string}>();
</script>