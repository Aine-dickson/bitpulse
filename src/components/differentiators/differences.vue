<template>
    <div id="why-bitpulse" class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Why BitPulse?</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Because ideas deserve to be built — beautifully and boldly. We engineer practical solutions that solve real-world problems and move industries forward.</p>

        <!-- Differences -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <differenceCard v-for="difference in differences" :title="difference.title" :description="difference.description" :image="difference.image" />
        </div>

        <div class="flex items-center justify-center mt-3 space-x-2 rtl:space-x-reverse">
            <span class="text-orange-400 font-medium hover:underline hover:text-orange-500 cursor-pointer">
                Learn what makes BitPulse different
            </span>
            <svg class="w-4 h-4 text-gray-800 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
        </div>

    </div>
</template>

<script setup lang="ts">
import differenceCard from './differenceCard.vue';

const differences = [
  {
    image: "innovate",
    title: "Driven by Innovation",
    description: "We don’t just follow trends — we engineer tomorrow’s breakthroughs from the ground up."
  },
  {
    image: "expert",
    title: "Full-Stack Expertise",
    description: "From hardware schematics to scalable cloud systems, we craft seamless end-to-end solutions."
  },
  {
    image: "community",
    title: "Community-Focused",
    description: "We build with and for people. Our open approach invites collaboration, learning, and shared success."
  },
];

</script>