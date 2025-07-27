<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" id="training-section">
        <!-- Hero Section -->
        <section class="px-6 md:px-16 py-16 bg-gradient-to-b from-gray-100 to-white dark:from-orange-900 via-gray-900 dark:to-gray-900">
            <div class="max-w-5xl mx-auto text-center">
                <h1 class="text-4xl font-bold text-orange-600 mb-4">
                    Technical Mentorship & Training
                </h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Equipping minds. Guiding journeys. We offer personalized mentorship and structured training for individuals and teams aiming to master modern technologies and real-world systems.
                </p>
            </div>
        </section>

        <!-- What We Offer -->
        <section class="px-6 md:px-16 py-12 bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-6">Grow With Practical, High-Impact Learning</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-semibold mb-2">🎯 Individual Mentorship</h3>
                        <p class="mb-4">
                            One-on-one guidance tailored to your learning goals — whether you're just starting or pivoting into deeper fields like embedded systems, backend development, or prototyping.
                        </p>

                        <h3 class="text-xl font-semibold mb-2">🏫 Institutional Training</h3>
                        <p class="mb-4">
                            Workshops and curriculums designed for schools, bootcamps, and innovation hubs — focused on results, application, and team empowerment.
                        </p>

                        <h3 class="text-xl font-semibold mb-2">💼 Corporate Upskilling</h3>
                        <p>
                            We help organizations train and retool teams with modern stacks and real-world patterns — Rust, TypeScript, system design, embedded logic, and more.
                        </p>
                    </div>
                    <div class="rounded-lg overflow-hidden shadow-xl">
                        <img src="" alt="Mentorship & Training Illustration" class="w-full h-auto" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Key Training Areas -->
        <section class="px-6 md:px-16 py-12 bg-gray-100 dark:bg-gray-800">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-6 text-center">Our Core Focus Areas</h2>
                <div class="grid md:grid-cols-3 gap-6 text-center">
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">Rust & Systems Programming</h3>
                        <p>Memory-safe programming, performance-first development, and systems thinking.</p>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">Embedded Systems</h3>
                        <p>Microcontroller programming, real-time logic, prototyping, and hardware interfaces.</p>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">Web & Backend Development</h3>
                        <p>Full-stack skills with TypeScript, Node.js, REST/GraphQL APIs, databases, and devops culture.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="px-6 md:px-16 py-12 bg-orange-600 text-white">
            <div class="max-w-4xl mx-auto text-center space-y-6">
                <h2 class="text-3xl font-bold">Ready to Grow? Let's Build Your Skills.</h2>
                <p class="text-lg">
                    We don’t just teach — we walk with you through real-world development challenges. From student to senior, we adapt to your pace and purpose.
                </p>
                <div class="flex flex-col md:flex-row justify-center gap-4">
                    <div @click="uiStore.showModal('bookSessionForm')" class="bg-white cursor-pointer text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Book a Session
                    </div>
                    <RouterLink
                        to="/services"
                        class="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
                    >
                        Explore More Services
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui';
import { onMounted } from 'vue';

let uiStore = useUiStore();
onMounted(() => {
    const sectionElement = document.getElementById('training-section');
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
});
</script>
