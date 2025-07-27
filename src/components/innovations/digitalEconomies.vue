<template>
    <div class="px-6 py-12 max-w-6xl mx-auto space-y-16" id="digitalEconomies-section">
        <!-- Hero Section -->
        <section class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 mb-4">Securing Digital Economies</h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                Powering trusted digital transactions, resilient infrastructure, and sovereign systems for the next generation of fintech and digital services.
            </p>
            <div class="mt-6">
                <RouterLink to="/partner" class="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                Let’s Secure the Future Together
                </RouterLink>
            </div>
        </section>

        <!-- Problem Statement -->
        <section class="text-left space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">The Challenge</h2>
            <p class="text-gray-400">
                Digital finance is growing fast — but so are the risks. From mobile wallets to decentralized finance, billions of micro and macro transactions are vulnerable to downtime, fraud, and surveillance.
            </p>
            <p class="text-gray-400">
                Without localized control, transparency, or security-first infrastructure, the promise of digital inclusion is easily undermined.
            </p>
        </section>

        <!-- Our Approach -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">How We’re Tackling It</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong>Secure-by-Design Systems</strong> — From firmware to frontend, our systems emphasize safety, auditability, and zero trust.</li>
                <li><strong>Decentralized Infrastructure</strong> — We build and integrate tools that remove single points of failure and restore user autonomy.</li>
                <li><strong>Transparent Data Handling</strong> — We offer solutions that handle user data with accountability, encryption, and clear ownership lines.</li>
                <li><strong>Custom Cryptographic Protocols</strong> — Tailored digital signatures, proofs, and identity systems for your region or context.</li>
            </ul>
        </section>

        <!-- Focus Areas -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">Our Focus</h2>
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">🛡️ Resilient Infrastructure</h3>
                    <p>Offline-ready systems for mobile money, transaction verification, and data syncing in low-connectivity environments.</p>
                </div>
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">🔐 Digital Identity & Consent</h3>
                    <p>Lightweight cryptographic identity systems for user verification and consent logging without central servers.</p>
                </div>
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">💳 Custom Transaction Engines</h3>
                    <p>Build embedded or server-based digital transaction layers for financial or logistic systems.</p>
                </div>
                    <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">📊 Open Financial APIs</h3>
                    <p>Offer secure integration points for banking, remittance, savings groups, and digital cooperatives.</p>
                </div>
            </div>
        </section>

        <!-- Upcoming Initiatives -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">What’s Ahead</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li>Open-source toolkits for verifiable digital identity and access control</li>
                <li>Community-owned crypto wallets and local token systems</li>
                <li>Training on building resilient fintech with Rust and WebAssembly</li>
                <li>Research on localized financial protocols and sovereignty-respecting infrastructure</li>
            </ul>
        </section>

        <!-- Final CTA -->
        <section class="bg-orange-950 p-8 rounded-lg text-center shadow">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Let’s Build Trust Into Technology</h2>
            <p class="text-gray-300 mb-6">
                Whether you’re a fintech innovator, digital community, or government body — we’re ready to help you build secure, transparent, and sovereign digital systems.
            </p>
            <div class="space-y-4 flex flex-col sm:block sm:space-x-4">
                <RouterLink to="/partner" class="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">Partner With Us</RouterLink>
                <RouterLink to="/consultation" class="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Book Consultation</RouterLink>
                <RouterLink to="/services" class="bg-orange-800 border border-orange-500 text-gray-200 py-2 px-4 rounded hover:bg-orange-900">Explore Services</RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    const categoryElement = document.getElementById('digitalEconomies-section');
    if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth'});
    }
});
</script>