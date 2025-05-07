<template>
    <figure class="flex flex-col items-center justify-center p-8 text-center w-full h-full">
        <figcaption class="flex items-center justify-center">
            <img class="rounded-full w-11 h-11" :src="image" alt="profile picture">
        </figcaption>
        <blockquote class="max-w-2xl mx-auto mt-2 text-gray-500 mb-2 dark:text-gray-400">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white my-2">{{ title }}</h3>
            <p class="">{{ description }}</p>
        </blockquote>
    </figure>
</template>

<script setup lang="ts">
defineProps<{title: string, description: string, image: string}>()
</script>