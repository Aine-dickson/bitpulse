<template>
    <div class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Testimonials</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Because ideas deserve to be built, beautifully and boldly. We engineer practical solutions that solve real-world problems and move industries forward.</p>

        <div id="indicators-carousel" class="relative w-full" data-carousel="static">
            <!-- Carousel wrapper -->
            <div class="relative h-60 overflow-hidden rounded-lg md:h-96 flex items-center justify-center">
                <!-- Testimonial Items -->
                <testimonyCard v-for="testimony in testimonies" :name="testimony.name" :testimony="testimony.testimony" :title="testimony.title" :image="testimony.image"/>
            </div>
            <!-- Slider indicators -->
            <div class="absolute z-10 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>
            <!-- Slider controls -->
            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-orange-600/70 group-hover:bg-white/50 dark:group-hover:bg-orange-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-orange-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-200 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-orange-600/70 group-hover:bg-white/50 dark:group-hover:bg-orange-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-orange-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-200 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import testimonyCard from './testimonyCard.vue';

let testimonies = [
    {
        name: "Samuel K.",
        image: "/profile.webp",
        testimony: "BitPulse helped us bring our product to life faster than we imagined. Their team understood both the tech and the vision, and delivered beyond our expectations.",
        title: "Founder, AgriSense"
    },
    {
        name: "Dr. Brenda A.",
        image: "/profile.webp",
        testimony: "We integrated BitPulse’s smart hardware into our rural clinics, and the improvement in efficiency has been unbelievable. It’s tech made for real impact.",
        title: "District Health Officer"
    },
    {
        name: "Charles N.",
        image: "/profile.webp",
        testimony: "BitPulse's transport tech cut our coordination costs and boosted delivery accuracy by 40%. They're changing how logistics runs in Uganda.",
        title: "Operations Lead, FastGo Africa"
    },
    {
        name: "Amina T.",
        image: "/profile.webp",
        testimony: "Their open tools and documentation made it easy to plug into our own systems. As a developer, I love how BitPulse balances power and simplicity.",
        title: "Software Engineer"
    },
    {
        name: "Prof. John L.",
        image: "/profile.webp",
        testimony: "BitPulse isn't just building tech. They’re educating and inspiring the next generation of creators. Their commitment to open innovation is real.",
        title: "Lecturer, TechUni Uganda"
    }
];

</script>