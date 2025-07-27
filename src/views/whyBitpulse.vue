<template>
    <div class="min-h-screen bg-gray-950 text-gray-200" id="why-bitpulse">
        <!-- Hero Section -->
        <section class="bg-gradient-to-b from-orange-900 to-gray-950 py-16 px-6 text-center">
            <h1 class="text-4xl sm:text-5xl font-bold mb-4">Why BitPulse?</h1>
            <p class="text-lg max-w-3xl mx-auto">
                We’re not just building tech — we’re redefining what it can do for humanity.
            </p>
        </section>

        <!-- Core Values -->
        <section class="py-16 px-6 bg-gray-950">
            <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                <div>
                    <h2 class="text-2xl font-semibold mb-2">Driven by Innovation</h2>
                    <p>
                        We don’t ride waves — we create them. BitPulse is fueled by curiosity,
                        experimentation, and the fearless pursuit of game-changing ideas.
                    </p>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-2">Full-Stack Expertise</h2>
                    <p>
                        Hardware? Software? We speak both fluently. From IoT sensors to backend systems,
                        we engineer cohesion from end to end.
                    </p>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-2">Community-Focused</h2>
                    <p>
                        We're builders <em>with</em> the community, not just for it. Through mentorship,
                        open-source, and local collaborations, we scale impact together.
                    </p>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-2">Practical Impact</h2>
                    <p>
                        Every line of code and bolt of hardware we produce aims to solve a real-world
                        challenge — not just win awards.
                    </p>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-2">Tailored Solutions</h2>
                    <p>
                        We listen first, then build. Our solutions are molded by your needs, not
                        one-size-fits-all templates.
                    </p>
                </div>
            </div>
        </section>

        <!-- What We're Not -->
        <section class="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-6">What We’re Not</h2>
                <ul class="space-y-4 text-left">
                    <li>• A dev shop chasing trends. We solve deep tech problems with purpose.</li>
                    <li>• A buzzword factory. We prioritize clarity and execution over hype.</li>
                    <li>• A black box. We build transparently and collaboratively.</li>
                </ul>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 px-6 bg-orange-600 text-white text-center">
            <h2 class="text-3xl font-bold mb-4">Experience the BitPulse Difference</h2>
            <p class="mb-8 max-w-2xl mx-auto">
                Let’s build bold ideas into brilliant realities — together.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
                <router-link to="/services" class="bg-white text-orange-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100">
                    Explore Our Services
                </router-link>
                <router-link to="/partner" class="bg-white text-orange-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100">
                    Partner With Us
                </router-link>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
    const sectionElement = document.getElementById('why-bitpulse');
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
});
</script>

<style scoped>
section {
  transition: all 0.3s ease-in-out;
}
</style>
