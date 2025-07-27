<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" id="dev-tools-section">
        <!-- Hero -->
        <section class="px-6 md:px-16 py-16 bg-gradient-to-b from-gray-100 to-white dark:from-orange-800 via-gray-900 dark:to-gray-900">
            <div class="max-w-5xl mx-auto text-center">
                <h1 class="text-4xl font-bold text-orange-600 mb-4">
                    Developer Tools & Open Source Solutions
                </h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Building better workflows for builders. We create open developer tools, plugins, and solutions that help you go from idea to innovation, faster.
                </p>
            </div>
        </section>

        <!-- Details -->
        <section class="px-6 md:px-16 py-12 bg-white bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
                <h2 class="text-2xl font-semibold mb-4">Why We Build Developer Tools</h2>
                <p class="mb-4">
                    At BitCraft, we don’t just build products — we craft developer experiences. From CLI utilities to productivity-enhancing browser tools and full frameworks, we open the engine room of development and give you the keys.
                </p>
                <p>
                    Our mission is to shorten the learning curve, boost productivity, and make complex problems solvable with precision-crafted tools and public contributions.
                </p>
            </div>
            <div class="rounded-lg overflow-hidden shadow-xl">
                <img src="" alt="Developer Tools Illustration" class="w-full h-auto" />
            </div>
        </div>
        </section>

        <!-- Sample Tool Categories -->
        <section class="px-6 md:px-16 py-12 bg-gray-100 dark:bg-gray-800">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-8 text-center">What We Build & Support</h2>
                <div class="grid md:grid-cols-3 gap-6 text-center">
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">⚙️ CLI & Terminal Utilities</h3>
                        <p>From scaffolding tools to performance profilers — powerful helpers that live in your terminal.</p>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">🧩 Libraries & SDKs</h3>
                        <p>Modular, well-documented libraries for Rust, JS, TypeScript, and more — tested, open, extensible.</p>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">🌐 Developer Dashboards</h3>
                        <p>Visual, web-based tooling to help you debug, simulate, and organize your development workflow.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- OSS Culture & Community -->
        <section class="px-6 md:px-16 py-12 bg-white dark:bg-gray-900">
            <div class="max-w-5xl mx-auto text-center">
                <h2 class="text-2xl font-semibold mb-6">An Open Source-First Mindset</h2>
                <p class="mb-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our open source projects aren’t side gigs — they’re core to how we build. We believe open communities move faster, ship better, and inspire greater trust.
                </p>
                <!-- TODO: Add link to opensource repo -->
                <RouterLink
                to=""
                class="inline-block cursor-not-allowed bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
                >
                    Explore Our Public Repos
                </RouterLink>
            </div>
        </section>

        <!-- CTA -->
        <section class="px-6 md:px-16 py-12 bg-orange-600 text-white">
            <div class="max-w-4xl mx-auto text-center space-y-6">
                <h2 class="text-3xl font-bold">Have a Tool in Mind? Let’s Build It.</h2>
                <p class="text-lg">
                    Whether you need a custom SDK, CI utility, documentation engine, or dev dashboard — we’re ready to craft it with you or help maintain what you already have.
                </p>
                <div class="flex flex-col md:flex-row justify-center gap-4">
                    <div @click="uiStore.showModal('devSolutionRequestForm')" class="bg-white cursor-pointer text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Request a Solution
                    </div>
                    <RouterLink
                        to="/services"
                        class="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
                    >
                        View All Services
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
    const sectionElement = document.getElementById('dev-tools-section');
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
});
</script>
