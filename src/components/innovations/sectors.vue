<template>
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a href="#" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800" role="alert">
            <span class="text-xs bg-orange-500 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span class="text-sm font-medium">BitPulse is out! See what's new</span> 
            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </a>
        <h1 id="sectors" class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Where BitPulse Innovates</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">We design integrated hardware and software solutions targeting sectors with the highest potential for sustainable growth and human development.</p>

        <!-- Innovation Sectors -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <sectorCard v-for="sector in sectors" :title="sector.title" :description="sector.description" :image="sector.image" :cta="sector.cta" :path="sector.path"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import sectorCard from './sectorCard.vue';
const sectors = [
    {
        image: "wifi.svg",
        title: "Smarter Cities, Smarter Living",
        description: "From intelligent traffic lights to connected homes, we’re engineering infrastructures that adapt and respond in real time.",
        cta: "Explore how we build smart systems",
        path: "smarter_cities"
    },
    {
        image: "health_tech.svg",
        title: "Revolutionizing Health Tech",
        description: "Bridging medicine and microcontrollers to deliver accurate, fast, and connected health solutions.",
        cta: "See how we improve patient care",
        path: "health_tech"
    },
    {
        image: "fintech.svg",
        title: "Securing Digital Economies",
        description: "We build safe and efficient financial systems that protect assets and simplify digital transactions.",
        cta: "Learn how we secure financial tech",
        path: "fintech"
    },
    {
        image: "educ.svg",
        title: "Empowering Learners Through Tech",
        description: "We design platforms and tools that make knowledge accessible, interactive, and personalized for all.",
        cta: "See how we enhance education",
        path: "education"
    },
    {
        image: "dev.svg",
        title: "Boosting Developer Productivity",
        description: "Our open tools are made for speed, clarity, and power—built by devs, for devs.",
        cta: "Discover our developer stack",
        path: "developer_tools"
    },
    {
        image: "embed.svg",
        title: "Hardware Meets Intelligence",
        description: "From MCUs to robots, we fuse embedded code with real-world impact across industries.",
        cta: "Uncover our embedded solutions",
        path: "embedded_systems"
    },
];
</script>