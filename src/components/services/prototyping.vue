<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" id="prototyping-section">
        <!-- Hero Section -->
        <section class="px-6 md:px-16 py-16 bg-gradient-to-b from-gray-100 to-white dark:from-orange-900 via-gray-900 dark:to-gray-900">
            <div class="max-w-5xl mx-auto text-center">
                <h1 class="text-4xl font-bold text-orange-600 mb-4">
                Custom R&D Prototyping
                </h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From concept to proof-of-concept — we help you explore, validate, and build novel tech solutions tailored to your unique challenges and visions.
                </p>
            </div>
        </section>

        <!-- Unique Value -->
        <section class="px-6 md:px-16 py-12 bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-6">Why Partner With Us for R&D Prototyping?</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-semibold mb-2">🧠 Innovation Meets Execution</h3>
                        <p class="mb-4">
                            Whether you’re a startup with a wild idea or an organization exploring new capabilities, we provide the technical precision and creative freedom to bring it to life.
                        </p>

                        <h3 class="text-xl font-semibold mb-2">⚡ Fast Turnaround, No Compromise</h3>
                        <p class="mb-4">
                            We move fast without cutting corners — agile validation loops, iterative design, and consistent communication ensure we stay aligned with your goals.
                        </p>

                        <h3 class="text-xl font-semibold mb-2">🔧 Hardware + Software Integration</h3>
                        <p>
                            Need embedded tech, firmware, web dashboards, or IoT integrations? We blend cross-domain skills to prototype full systems — not just sketches.
                        </p>
                    </div>
                    <div class="rounded-lg overflow-hidden shadow-xl">
                        <img src="" alt="R&D Prototyping Illustration" class="w-full h-auto" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Prototype Examples -->
        <section class="px-6 md:px-16 py-12 bg-gray-100 dark:bg-gray-800">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-6 text-center">What We Can Prototype</h2>
                <div class="grid md:grid-cols-3 gap-6 text-center">
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">Smart Devices</h3>
                        <p>IoT sensors, wearables, control systems — from electronics to firmware to cloud.</p>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">Interactive Tools</h3>
                        <p>Rapid web or mobile-based UX prototypes for user validation or internal testing.</p>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 class="font-bold text-lg mb-2">Proof-of-Concept Engines</h3>
                        <p>Custom algorithms, simulators, and functional software that prove what’s possible.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="px-6 md:px-16 py-12 bg-orange-600 text-white">
            <div class="max-w-4xl mx-auto text-center space-y-6">
                <h2 class="text-3xl font-bold">Let’s Build Your Next Big Idea</h2>
                <p class="text-lg">We’re excited to hear what you're thinking. Let’s turn that idea into a working reality — fast and fearlessly.</p>
                    <div class="flex flex-col md:flex-row justify-center gap-4">
                        <div @click="uiStore.showModal('customPrototypeForm')" class="cursor-pointer bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Start a Conversation
                        </div>
                        <RouterLink to="/services" class="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition">
                            Browse More Services
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
    const sectionElement = document.getElementById('prototyping-section');
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
});
</script>
