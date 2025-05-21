<template>
    <section class="">
        <!-- Where BitPulse innovates -->
        <sectors />
        
        <!-- Why Bitpulse -->
        <differences />

        <div class="pb-4 mt-8 lg:mt-16 px-4 mx-auto max-w-screen-xl lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Featured products</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:w-[60%] dark:text-gray-400">Because ideas deserve to be built — beautifully and boldly. We engineer practical solutions that solve real-world problems and move industries forward.</p>

            <!-- Featured Products-->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <featuredProduct v-for="product in featuredProducts" :title="product.title" :description="product.description" :image="product.image" />
            </div>
        </div>

        <!-- Testimonials -->
        <testimonials />

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
import featuredProduct from '../../public/featuredProduct.vue';
import contactForm from './contactForm.vue';
import sectors from './innovations/sectors.vue';
import differences from './differentiators/differences.vue';
import testimonials from './testimonials/testimonials.vue';


const featuredProducts = [
  {
    title: "PulseDocs",
    image: "docs.svg",
    description: [
      "Publish documentation from Markdown.",
      "Built-in version control for every update.",
      "Custom domain and branding support.",
      "Works seamlessly with CI/CD pipelines.",
      "Perfect for open-source and internal teams."
    ]
  },
//   {
//     title: "SafePulse",
//     image: "/images/products/safepulse.png",
//     description: [
//       "End-to-end encrypted digital vault.",
//       "2FA, biometric lock & recovery options.",
//       "Multi-device synchronization support.",
//       "Store credentials, NFTs, legal files securely.",
//       "Open standard with offline access mode."
//     ]
//   },
  {
    title: "BitConnect",
    image: "connect.svg",
    description: [
      "Fully decentralized peer-to-peer messaging.",
      "End-to-end encryption with zero metadata leaks.",
      "Offline-first with sync when online.",
      "No central server required — runs on nodes.",
      "Built for privacy, teams, and crisis response."
    ]
  },
//   {
//     title: "CitySense",
//     image: "/images/products/citysense.png",
//     description: [
//       "AI-powered traffic management system.",
//       "Fuzzy logic for adaptive light timing.",
//       "Node-to-node communication for syncing lanes.",
//       "Real-time sensor integration for data accuracy.",
//       "Designed for growing smart city deployments."
//     ]
//   },
//   {
//     title: "CraftOS",
//     image: "/images/products/craftos.png",
//     description: [
//       "Lightweight embedded OS in pure Rust.",
//       "Deterministic scheduling for real-time tasks.",
//       "Minimal memory footprint (<50KB).",
//       "Cross-platform: ESP32, STM32, RISC-V, etc.",
//       "Ideal for IoT, wearables, and low-power apps."
//     ]
//   },
  {
    title: "BitInsight",
    image: "insight.svg",
    description: [
      "No-code analytics dashboard builder.",
      "Drag & drop data widgets with live preview.",
      "Import from CSV, APIs, or live databases.",
      "Shareable reports with role-based access.",
      "Tailored for SMEs and non-technical users."
    ]
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