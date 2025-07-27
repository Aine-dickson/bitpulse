<template>
    <div class="px-6 py-12 max-w-6xl mx-auto space-y-16" id="education-section">
        <!-- Hero Section -->
        <section class="text-center">
            <h1 class="text-4xl font-bold text-gray-200 mb-4">Empowering Learners Through Tech</h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                We’re redefining access, delivery, and engagement in education — giving learners the tools to grow, build, and lead with technology.
            </p>
            <div class="mt-6">
                <RouterLink to="/partner" class="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                    Partner for Impact
                </RouterLink>
            </div>
        </section>

        <!-- Problem Statement -->
        <section class="text-left space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">The Challenge</h2>
            <p class="text-gray-400">
                Education remains unequally distributed — limited by resources, rigid systems, outdated tools, or lack of infrastructure. In many communities, learners and educators have the potential, but not the platform.
            </p>
            <p class="text-gray-400">
                Without relevant, accessible, and modern educational tech, we risk leaving entire generations behind in a fast-changing digital world.
            </p>
        </section>

        <!-- Our Approach -->
        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-200">How We’re Making a Difference</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li><strong>Tech-Enabled Classrooms</strong> — From affordable hardware to interactive software, we help educators upgrade learning environments.</li>
                <li><strong>Digital Skills Platforms</strong> — We develop accessible tools for coding, STEM, and hands-on tech discovery — online and offline.</li>
                <li><strong>Teacher Support Systems</strong> — Mentorship tools, content management, and co-creation spaces for educators to grow and connect.</li>
                <li><strong>Open Curriculum Resources</strong> — Freely available modules on system programming, AI basics, hardware, and real-world problem solving.</li>
            </ul>
        </section>

        <!-- Focus Areas -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">Focus Points</h2>
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">🎓 Youth & School Programs</h3>
                    <p>Interactive learning platforms and kits for schools, clubs, and community centers to spark curiosity in tech early.</p>
                </div>
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">🛠️ Vocational Tech Education</h3>
                    <p>Custom tech bootcamps and hardware training for practical, employment-ready skills in underserved regions.</p>
                </div>
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">🌐 Inclusive Online Learning</h3>
                    <p>Low-bandwidth digital classrooms and resource hubs that work even in disconnected or rural areas.</p>
                </div>
                <div class="border border-slate-800 p-4 rounded shadow">
                    <h3 class="font-semibold mb-2 text-orange-700 text-lg">🤝 Community & Peer Learning</h3>
                    <p>Open-source learning circles, mentorship matching, and knowledge-sharing platforms led by and for learners.</p>
                </div>
            </div>
        </section>

        <!-- Upcoming Initiatives -->
        <section>
            <h2 class="text-2xl font-semibold text-gray-200 mb-4">What’s Ahead</h2>
            <ul class="list-disc pl-5 text-gray-400 space-y-2">
                <li>Open-learning mini kits for embedded systems and automation</li>
                <li>Rust and WebAssembly courses tailored for youth and universities</li>
                <li>Teacher-onboarding toolkit for tech adoption in low-resource settings</li>
                <li>Global mentorship program connecting developers with learners</li>
            </ul>
        </section>

        <!-- Final CTA -->
        <section class="bg-orange-950 p-8 rounded-lg text-center shadow">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Let’s Make Learning Limitless</h2>
            <p class="text-gray-300 mb-6">
                Whether you’re an educator, learner, institution, or nonprofit — we want to collaborate with you to make tech-enabled education accessible and inspiring.
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
    const categoryElement = document.getElementById('education-section');
    if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth'});
    }
});
</script>

