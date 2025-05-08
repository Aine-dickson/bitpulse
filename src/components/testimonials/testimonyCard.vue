<template>
    <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
        <figure class="max-w-screen-md mx-auto">
            <blockquote>
                <p class="text-2xl font-medium text-gray-900 dark:text-white">"{{ testimony }}"</p>
            </blockquote>
            <figcaption class="flex items-center justify-center mt-6 space-x-3">
                <img class="w-6 h-6 rounded-full" :src="image" alt="profile picture">
                <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div class="pr-3 font-medium text-gray-900 dark:text-white">— {{ name }}</div>
                    <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{{ title }}</div>
                </div>
            </figcaption>
        </figure>
    </div>
</template>

<script setup lang="ts">
defineProps<{name: string, title: string, image: string, testimony: string}>()
</script>