<template>
    <section class="bg-white dark:bg-gray-950">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <a href="#" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800" role="alert">
                <span class="text-xs bg-orange-500 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span class="text-sm font-medium">BitPulse is out! See what's new</span> 
                <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </a>
            <h1 id="sectors" class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Where BitPulse Innovates</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">We design integrated hardware and software solutions targeting sectors with the highest potential for sustainable growth and human development.</p>

            <!-- Innovation Sectors -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <innovationSector v-for="sector in sectors" :title="sector.title" :description="sector.description" :image="sector.image" :cta="sector.cta" />
            </div>
        </div>
        
        <div id="why-bitpulse" class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Why BitPulse?</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Because ideas deserve to be built — beautifully and boldly. We engineer practical solutions that solve real-world problems and move industries forward.</p>

            <!-- Differentiators -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <differentiator v-for="differentiator in differentiators" :title="differentiator.title" :description="differentiator.description" :image="differentiator.image" />
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

        <div class="pb-4 mt-8 lg:mt-16 px-4 mx-auto max-w-screen-xl lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Featured products</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:w-[60%] dark:text-gray-400">Because ideas deserve to be built — beautifully and boldly. We engineer practical solutions that solve real-world problems and move industries forward.</p>

            <!-- Featured Products-->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <featuredProduct v-for="product in featuredProducts" :title="product.title" :description="product.description" :image="product.image" />
            </div>
        </div>

        <div class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Testimonials</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Because ideas deserve to be built — beautifully and boldly. We engineer practical solutions that solve real-world problems and move industries forward.</p>

            <div id="indicators-carousel" class="relative w-full" data-carousel="static">
                <!-- Carousel wrapper -->
                <div class="relative h-56 overflow-hidden rounded-lg md:h-96 flex items-center justify-center">
                    <!-- Testimonial Items -->
                    <testimonial v-for="testimony in testimonies" :name="testimony.name" :testimony="testimony.testimony" :title="testimony.title" :image="testimony.image"/>
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
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </div>

        <section id="contact" class="bg-gray-50 py-16 px-6 md:px-12 lg:px-24 dark:bg-gray-950 dark:text-white">
            <div class="max-w-5xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    Let’s Build the Future Together
                </h2>
                <p class="text-gray-600 mb-12 dark:text-white">
                    Whether you need a trusted tech partner, want to collaborate, or simply have questions — we're ready to talk.
                </p>

                <!-- Contact Form -->
                <contactForm />
            </div>
        </section>

    </section>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import innovationSector from './innovationSector.vue';
import differentiator from './differentiator.vue';
import featuredProduct from './featuredProduct.vue';
import testimonial from './testimonial.vue';
import contactForm from './contactForm.vue';

let testimonies = [
    {
        name: "Samuel K.",
        image: "/profile.png",
        testimony: "BitPulse helped us bring our product to life faster than we imagined. Their team understood both the tech and the vision — and delivered beyond our expectations.",
        title: "Founder, AgriSense"
    },
    {
        name: "Dr. Brenda A.",
        image: "/profile.png",
        testimony: "We integrated BitPulse’s smart hardware into our rural clinics, and the improvement in efficiency has been unbelievable. It’s tech made for real impact.",
        title: "District Health Officer"
    },
    {
        name: "Charles N.",
        image: "/profile.png",
        testimony: "BitPulse's transport tech cut our coordination costs and boosted delivery accuracy by 40%. They're changing how logistics runs in Uganda.",
        title: "Operations Lead, FastGo Africa"
    },
    {
        name: "Amina T.",
        image: "/profile.png",
        testimony: "Their open tools and documentation made it easy to plug into our own systems. As a developer, I love how BitPulse balances power and simplicity.",
        title: "Software Engineer"
    },
    {
        name: "Prof. John L.",
        image: "/profile.png",
        testimony: "BitPulse isn't just building tech — they’re educating and inspiring the next generation of creators. Their commitment to open innovation is real.",
        title: "Lecturer, TechUni Uganda"
    }
];

let sectors = [
    {
        title: "Smart Transport",
        description: "Intelligent traffic and mobility systems built to ease urban congestion and reduce road fatalities",
        image: "/profile.png",
        cta: "Learn more"
    },
    {
        title: "Smart Transport",
        description: "Intelligent traffic and mobility systems built to ease urban congestion and reduce road fatalities",
        image: "/profile.png",
        cta: "Learn more"
    },
    {
        title: "Smart Transport",
        description: "Intelligent traffic and mobility systems built to ease urban congestion and reduce road fatalities",
        image: "/profile.png",
        cta: "Learn more"
    }
];

let differentiators = [
    {
        title: "Innovation",
        description: "We are committed to pushing the boundaries of technology and design.",
        image: "/profile.png"
    },
    {
        title: "Collaboration",
        description: "We believe in the power of teamwork and open communication.",
        image: "/profile.png"
    },
    {
        title: "Sustainability",
        description: "We prioritize eco-friendly practices in all our projects.",
        image: "/profile.png"
    }
];

let featuredProducts = [
    {
        title: "Smart Transport",
        image: "/profile.png",
        description: ["Hello world", "Hello bitpulse", "Hello Africa"]
    },
    {
        title: "Smart Transport",
        image: "/profile.png",
        description: ["Hello world", "Hello bitpulse", "Hello Africa"]
    },
    {
        title: "Smart Transport",
        image: "/profile.png",
        description: ["Hello world", "Hello bitpulse", "Hello Africa"]
    }
];

onMounted(() => {
    const items = document.querySelectorAll('[data-carousel-item]');
    const prevBtn = document.querySelector('[data-carousel-prev]');
    const nextBtn = document.querySelector('[data-carousel-next]');
    const indicators = document.querySelectorAll('[data-carousel-slide-to]');
    let current = 0;

    function showSlide(index: number) {
        items.forEach((item, i) => {
            item.classList.toggle('hidden', i !== index);
            item.setAttribute('data-carousel-item', i === index ? 'active' : '');
        });
        indicators.forEach((btn, i) => {
            btn.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
        current = index;
    }

    nextBtn?.addEventListener('click', () => {
        const next = (current + 1) % items.length;
        showSlide(next);
    });

    prevBtn?.addEventListener('click', () => {
        const prev = (current - 1 + items.length) % items.length;
        showSlide(prev);
    });

    indicators.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });

    showSlide(0); // Initialize
});

</script>