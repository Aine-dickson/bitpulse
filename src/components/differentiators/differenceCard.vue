<template>
    <figure class="flex flex-col items-center justify-center p-8 text-center w-full h-full">
        <figcaption class="flex items-center justify-center">
            <div v-if="image == 'innovate'" class="flex justify-center items-center mb-4 w-10 h-10 rounded-md bg-green-100 lg:h-12 lg:w-12 dark:bg-green-900">
                <img src="../../assets/innovate.svg" alt="">
            </div>
            <div v-if="image == 'expert'" class="flex justify-center items-center mb-4 w-10 h-10 rounded-md bg-yellow-100 lg:h-12 lg:w-12 dark:bg-yellow-900">
                <img src="../../assets/expert.svg" alt="">
            </div>
            <div v-if="image == 'community'" class="flex justify-center items-center mb-4 w-10 h-10 rounded-md bg-purple-100 lg:h-12 lg:w-12 dark:bg-purple-900">
                <img src="../../assets/community.svg" alt="">
            </div>
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