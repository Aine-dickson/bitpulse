<template>
    <div class="px-6 py-12 max-w-6xl mx-auto space-y-16">
        <!-- Hero Section -->
        <section class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 mb-4">Boosting Developer Productivity</h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                We create tools and environments that reduce friction, streamline workflows, and let developers focus on what truly matters — building amazing things.
            </p>
            <div class="mt-6">
                <RouterLink to="/dev-tools" class="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                    Discover Developer Tools
                </RouterLink>
            </div>
        </section>

        <!-- Challenge -->
        <section class="text-left space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">The Problem</h2>
            <p class="text-gray-400">
                Developers face a constant battle with distractions, bloated stacks, poor documentation, tool fatigue, and steep learning curves.
                These challenges waste time, drain creativity, and increase burnout.
            </p>
            <p class="text-gray-400">
                We believe that dev tools should empower — not overwhelm. Every second reclaimed means more time to build, create, and solve.
            </p>
        </section>

        <!-- What We Do -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">Our Developer-First Approach</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong>Minimal & Powerful Tooling</strong> — Simple, fast tools designed to do one thing well, with no fluff or vendor lock-in.</li>
                <li><strong>Custom Developer Environments</strong> — Preconfigured and containerized environments for embedded systems, web, and systems programming.</li>
                <li><strong>Documentation Generators & Dev UX Tools</strong> — Internal tools that write, document, and scaffold so developers don’t have to.</li>
                <li><strong>Rust-Based Productivity Utilities</strong> — CLI tools and microframeworks built in Rust, tailored for safety, speed, and clarity.</li>
            </ul>
        </section>

        <!-- Focus Areas -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">Where We Focus</h2>
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🚀 Workflow Automation</h3>
                    <p>From repo setup to deployment — we automate repetitive tasks with smart, version-aware templates and triggers.</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🧰 Toolkits for Embedded Developers</h3>
                    <p>MCU-focused utilities, template bootloaders, and peripheral abstractions that shorten prototyping cycles.</p>
                </div>
                    <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🧠 Cognitive Load Reduction</h3>
                    <p>Clean interfaces, clear feedback, and tooling that matches how developers actually think and work.</p>
                </div>
                <div class="bg-slate-800 p-6 rounded shadow">
                    <h3 class="font-semibold text-lg">🌐 Web & Systems Builders</h3>
                    <p>Integrated toolchains for Rust+WASM, Node.js, and low-level systems — with speed and composability at the core.</p>
                </div>
            </div>
        </section>

        <!-- What's Coming -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">What’s Coming Next</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li>BitPulse CLI for embedded scaffolding and project generation</li>
                <li>Browser-based IDE extensions tailored for devs in low-resource environments</li>
                <li>Rust-powered productivity layer for IoT workflows</li>
                <li>Open-source debugging and diagnostics dashboard</li>
            </ul>
        </section>

        <!-- Final CTA -->
        <section class="bg-orange-950 p-8 rounded-lg text-center shadow">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Empower Developers, Accelerate Innovation</h2>
            <p class="text-gray-300 mb-6">
                We’re building with and for developers. Whether you’re looking for better tooling or want to co-create open dev infra — let’s talk.
            </p>
            <div class="space-y-4 flex flex-col sm:block sm:space-x-4">
                <RouterLink to="/dev-tools" class="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">Explore Tools</RouterLink>
                <RouterLink to="/consultation" class="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800">Request a Solution</RouterLink>
                <RouterLink to="/partner" class="bg-orange-800 border border-orange-500 text-gray-200 py-2 px-4 rounded hover:bg-orange-900">Partner With Us</RouterLink>
            </div>
        </section>
    </div>
</template>
