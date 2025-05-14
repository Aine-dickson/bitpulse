<template>
    <section class="max-w-6xl mx-auto px-4 py-16 space-y-16 text-white">
        <!-- Header -->
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Partner with BitPulse</h1>
            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Let’s co-create meaningful solutions in embedded systems, software, R&amp;D, and community tech. Whether you're a startup, organization, or visionary, we’d love to explore how we can work together.
            </p>
        </div>

        <!-- Why Partner With Us -->
        <div>
            <h2 class="text-2xl font-semibold mb-6 text-center">Why Partner With Us?</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div v-for="(item, index) in partnershipBenefits" :key="index" class="bg-white dark:bg-gray-900 shadow rounded-2xl p-6 border">
                    <h3 class="text-xl font-medium mb-2">{{ item.title }}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-lg">{{ item.text }}</p>
                </div>
            </div>
        </div>
        <!-- Types of Partnerships -->
        <div>
            <h2 class="text-3xl font-semibold mb-6">Ways We Can Work Together</h2>
            <ul class="grid md:grid-cols-2 gap-6 list-disc list-inside text-gray-500 dark:text-gray-400 text-lg">
                <li v-for="(item, index) in partnershipTypes" :key="index">{{ item }}</li>
            </ul>
        </div>

        <!-- Call to Action -->
        <div class="text-center space-y-6">
            <h3 class="text-2xl font-semibold">Let’s build something powerful together</h3>
            <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
                Fill out a quick form, pitch an idea, or schedule a call — we’ll take it from there.
            </p>
            <div class="flex justify-center gap-4">
                <span
                    @click="uiStore.showModal('partnershipForm')"
                    class="bg-primary cursor-pointer text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition"
                >
                    Propose a Partnership
                </span>

                <!-- TODO: Implement call scheduling -->
                <span
                    @click=""
                    class="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition cursor-not-allowed"
                >
                    Book a Call
                </span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();

const partnershipBenefits = [
  {
    title: 'Innovative Engineering',
    text: 'Access cutting-edge embedded and software development to power real-world impact.',
  },
  {
    title: 'Flexible Collaboration',
    text: 'From joint ventures to white-label R&D, we tailor collaboration to your vision.',
  },
  {
    title: 'Driven by Purpose',
    text: 'We care about meaningful tech — from local needs to scalable systems.',
  },
];

const partnershipTypes = [
  'Product Co-Development & Technical Integration',
  'Custom Hardware & IoT Research Collaborations',
  'Government & NGO Technology Partnerships',
  'Academic & Technical Training Partnerships',
  'Beta Testing or Early Adopter Programs',
  'Funding or Strategic Tech Alliances',
];
</script>

<style scoped>
@reference "../assets/main.css";
.bg-primary {
  @apply bg-orange-600;
}
</style>
