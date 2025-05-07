<template>
    <figure class="flex flex-col items-start justify-center p-8 w-full h-full">
        <img class="rounded-lg w-24 h-24" :src="image" :alt="image">
        <blockquote class="mx-auto mt-2 text-gray-500 mb-2 dark:text-gray-400 w-full">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white my-2">{{ title }}</h3>
            <ul class="">
                <li v-for="desc in description" class="flex items-start mb-6 space-x-3 rtl:space-x-reverse">
                    <div class="flex items-center">
                        <div class="flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full ring-white dark:bg-blue-900 shrink-0">
                            <svg class="w-2.5 h-2.5 text-blue-100 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                        </div>
                    </div>
                    <p class="">{{ desc }}</p>
                </li>
            </ul>
        </blockquote>
    </figure>
</template>

<script setup lang="ts">
defineProps<{title: string, description: string[], image: string}>();
</script>