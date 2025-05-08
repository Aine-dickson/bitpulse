<template>
    <figure class="flex flex-col items-center justify-center p-8 text-center w-full h-full">
        <figcaption class="flex items-center justify-center">
            <img class="rounded-full w-15 h-15" :src="image" alt="profile picture">
        </figcaption>
        <blockquote class="max-w-2xl mx-auto mt-2 text-gray-500 mb-2 dark:text-gray-400">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white my-2">{{ title }}</h3>
            <p class="">{{ description }}</p>
        </blockquote>
        <div class="flex items-center justify-center mt-3 space-x-2 rtl:space-x-reverse">
            <span class="text-orange-400 font-medium hover:underline hover:text-orange-500 cursor-pointer">
                {{ cta }}
            </span>
            <svg class="w-4 h-4 text-gray-800 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
        </div>
    </figure>
</template>

<script setup lang="ts">
defineProps<{title: string, description: string, image: string, cta: string}>()
</script>