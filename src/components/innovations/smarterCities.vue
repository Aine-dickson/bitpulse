<template>
    <div class="px-6 py-12 max-w-6xl mx-auto space-y-16">
        <!-- Hero Section -->
        <section class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 mb-4">Smarter Cities, Smarter Living</h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                Urban innovation that redefines how people live, move, and connect — powered by data, intelligence, and purposeful design.
            </p>
            <div class="mt-6">
                <RouterLink to="/partner" class="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                    Partner with us to shape the cities of tomorrow
                </RouterLink>
            </div>
        </section>

        <!-- Problem Statement -->
        <section class="text-left space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">The Problem</h2>
            <p class="text-gray-400">
                Across Africa and the globe, cities are growing at unprecedented rates. But outdated infrastructure, inefficient services,
                and disconnected systems still define daily life for millions.
            </p>
            <p class="text-gray-400">
                From traffic gridlock to wasteful energy usage, from delayed emergency response to limited mobility — our cities are too
                often reactive, not responsive.
            </p>
        </section>

        <!-- Our Approach -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">Our Approach</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong>Intelligent Infrastructure</strong> — Adaptive traffic lights, smart parking, energy-aware buildings</li>
                <li><strong>Sensor-Driven Environments</strong> — Real-time monitoring for air, water, light, and movement</li>
                <li><strong>Connected Systems</strong> — Seamless communication between transportation, emergency, and utility networks</li>
                <li><strong>Citizen-Centric Design</strong> — Tools that empower residents to interact with their city</li>
            </ul>
            <p class="text-gray-400">
                We use <strong>data fusion</strong>, <strong>edge computing</strong>, and <strong>custom embedded tech</strong> to develop smart city systems that are modular, scalable, and tailored for African cities and beyond.
            </p>
        </section>

        <!-- Focus Areas -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">Focus Areas</h2>
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🚦 Smart Mobility</h3>
                    <p>Dynamic control of traffic flow, public transport tracking, and integrated route optimization</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">⚡ Energy Efficiency</h3>
                    <p>Load balancing systems, street lighting automation, and solar/grid hybrid monitoring</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🧭 Emergency Awareness</h3>
                    <p>Sensor-based alerts for fire, flooding, or security breaches — routed to the right agencies instantly</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🏘️ Community Interaction</h3>
                    <p>Open platforms for local feedback, service reporting, and location-based insights</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow md:col-span-2">
                    <h3 class="font-semibold text-lg">📊 Urban Intelligence Dashboards</h3>
                    <p>All city data in one place — interactive dashboards for city planners and leaders</p>
                </div>
            </div>
        </section>

        <!-- What's Coming -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">What's Coming</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li>Low-power smart sensors for traffic and environment</li>
                <li>AI-assisted traffic coordination systems</li>
                <li>Secure device-to-device communication across city blocks</li>
                <li>Pilot projects with local municipal councils (coming soon)</li>
            </ul>
        </section>

        <!-- Final CTA -->
        <section class="bg-orange-950 p-8 rounded-lg text-center shadow">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Let’s Build the Future, Together</h2>
            <p class="text-gray-300 mb-6">
                Not sure how your organization fits in this vision? We're looking for bold municipal leaders, NGOs, startups, and infrastructure partners to shape better cities with us.
            </p>
            <div class="sm:space-x-4 flex flex-col space-y-4 sm:block">
                <RouterLink to="/partner" class="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">Partner With Us</RouterLink>
                <RouterLink to="/consultation" class="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Request a Consultation</RouterLink>
                <RouterLink to="/services" class="bg-orange-800 border border-orange-500 text-gray-200 py-2 px-4 rounded hover:bg-orange-900">Explore Services</RouterLink>
            </div>
        </section>
    </div>
</template>

