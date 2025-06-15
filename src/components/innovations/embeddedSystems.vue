<template>
    <div class="px-6 py-12 max-w-6xl mx-auto space-y-16">
        <!-- Hero Section -->
        <section class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 mb-4">Hardware Meets Intelligence</h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                At BitPulse, we design smart hardware systems that bridge the physical and digital — creating intelligent devices that think, act, and adapt.
            </p>
            <div class="mt-6">
                <RouterLink to="/services/embedded-iot" class="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                Explore Embedded Solutions
                </RouterLink>
            </div>
        </section>

        <!-- The Challenge -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">The Challenge</h2>
            <p class="text-gray-400">
                Most hardware today is either too dumb to adapt or too bloated to be practical. Building smart devices that are efficient, reliable, and intuitive requires deep integration between electronics, firmware, and intelligence.
            </p>
            <p class="text-gray-400">
                Our goal is to build lean, purposeful hardware that doesn't just function — it collaborates with its environment.
            </p>
        </section>

        <!-- Our Approach -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">Our Integration Approach</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong>Low-Level Control</strong> — We program close to the metal using Rust and C, ensuring safety, determinism, and speed.</li>
                <li><strong>Modular Firmware</strong> — Smart codebases that adapt to sensors, motors, displays, and cloud APIs with pluggable modules.</li>
                <li><strong>Edge AI Readiness</strong> — Lightweight neural logic and decision models that fit on chips, not just servers.</li>
                <li><strong>Design for Context</strong> — Every build considers energy, latency, environment, and the real human need it's solving.</li>
            </ul>
        </section>

        <!-- Smart Hardware in Action -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">Where We're Applying It</h2>
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🏘️ Smart Access Systems</h3>
                    <p>Automated gates and doors with secure motor control, identity verification, and sensor-based responsiveness.</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🚚 Micro-Mobility Devices</h3>
                    <p>Battery-aware, GPS-enabled devices for smart, last-mile transportation and delivery.</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🏥 Medical IoT Tools</h3>
                    <p>Wearables and diagnostic devices that collect, process, and transmit vital data in real-time.</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🏭 Industrial Automation Units</h3>
                    <p>Real-time monitoring and actuation systems that adapt to load, heat, and throughput dynamics.</p>
                </div>
            </div>
        </section>

        <!-- What's in Progress -->
        <section>
        <h2 class="text-2xl font-semibold text-gray-200 mb-4">What’s in Progress</h2>
        <ul class="list-disc pl-5 text-gray-400 space-y-2">
            <li>Prototyping smart furniture with embedded sensors and motor control</li>
            <li>Developing a local-first firmware update protocol for rural deployment</li>
            <li>Integrating edge AI for traffic decision units and agricultural sensors</li>
            <li>Designing modular IoT development boards for students and researchers</li>
        </ul>
        </section>

        <!-- Final CTA -->
        <section class="bg-orange-950 p-8 rounded-lg text-center shadow">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Ready to Create Intelligent Hardware?</h2>
            <p class="text-gray-300 mb-6">
                Whether you’re building a smart home system, an intelligent transport unit, or an adaptive medical tool — we’re here to help engineer it, prototype it, and launch it.
            </p>
            <div class="space-y-4 flex flex-col sm:block sm:space-x-4">
                <RouterLink to="/services/embedded-iot" class="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">Start with Embedded</RouterLink>
                <RouterLink to="/consultation" class="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Book a Consultation</RouterLink>
                <RouterLink to="/partner" class="bg-orange-800 border border-orange-500 text-gray-200 py-2 px-4 rounded hover:bg-orange-900">Partner With Us</RouterLink>
            </div>
        </section>
    </div>
</template>
