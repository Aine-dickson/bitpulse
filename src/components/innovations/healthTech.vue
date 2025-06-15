<template>
    <div class="px-6 py-12 max-w-6xl mx-auto space-y-16">
        <!-- Hero Section -->
        <section class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 mb-4">Revolutionizing Health Tech</h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                Bridging gaps in care through intelligent devices, accessible platforms, and precision systems for diagnostics, monitoring, and delivery.
            </p>
            <div class="mt-6">
                <RouterLink to="/partner" class="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                    Let’s Create Impactful Health Solutions Together
                </RouterLink>
            </div>
        </section>

        <!-- Problem Statement -->
        <section class="text-left space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">The Challenge</h2>
            <p class="text-gray-400">
                Healthcare systems across many regions — especially in Africa — struggle with resource limitations, late interventions, and fragmented health data.
            </p>
            <p class="text-gray-400">
                Patients are underserved, providers are overwhelmed, and critical conditions go undetected until it's too late. We believe technology can intervene early, efficiently, and equitably.
            </p>
        </section>

        <!-- Our Approach -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">How We’re Tackling It</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong>Embedded Devices</strong> — Low-cost, low-power patient monitors and diagnostic tools built for field use</li>
                <li><strong>Health Data Platforms</strong> — Securely capturing and syncing data from remote health points</li>
                <li><strong>Early Detection Algorithms</strong> — AI-powered logic for triage, alerts, and condition tracking</li>
                <li><strong>Provider Tools</strong> — Dashboards and mobile-first UIs tailored for hospitals and clinics</li>
            </ul>
            <p class="text-gray-400">
                Whether it's a smart stethoscope, a maternal care tracker, or a community health data layer — we design for real-world
                constraints and high-impact outcomes.
            </p>
        </section>

        <!-- Focus Areas -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">Our Focus</h2>
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">👩‍⚕️ Remote Patient Monitoring</h3>
                    <p>Wearables and home kits for ongoing vitals and chronic condition tracking</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">📡 Community Health Devices</h3>
                    <p>Field-ready diagnostics for blood pressure, oxygen, glucose, etc. with mobile sync</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">📈 Health Intelligence</h3>
                    <p>Predictive analytics to guide public health decisions and early interventions</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🧬 Specialized Prototyping</h3>
                    <p>Custom hardware/software R&D for clinical or NGO health needs</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow md:col-span-2">
                    <h3 class="font-semibold text-lg">🔐 Privacy-First Health Data</h3>
                    <p>Encrypted transmission and localized storage options that respect patient privacy and compliance</p>
                </div>
            </div>
        </section>

        <!-- Upcoming Initiatives -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">What’s Ahead</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li>Open-source health sensor firmware and device kits</li>
                <li>Integration-ready health data APIs for small clinics</li>
                <li>Partnerships with med-tech institutions and NGOs</li>
                <li>Training for local developers and health innovators</li>
            </ul>
        </section>

        <!-- Final CTA -->
        <section class="bg-orange-950 p-8 rounded-lg text-center shadow">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Your Next Health Tech Partner</h2>
            <p class="text-gray-300 mb-6">
                Whether you’re a startup, health worker, NGO, or hospital system — let’s work together to bring accessible, smart health
                innovations to life.
            </p>
            <div class="space-y-4 flex flex-col sm:block sm:space-x-4">
                <RouterLink to="/partner" class="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">Partner With Us</RouterLink>
                <RouterLink to="/consultation" class="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Book Consultation</RouterLink>
                <RouterLink to="/services" class="bg-orange-800 border border-orange-500 text-gray-200 py-2 px-4 rounded hover:bg-orange-900">Explore Services</RouterLink>
            </div>
        </section>
    </div>
</template>

