<template>
    <div class="">
        <div v-if="childRoutes.includes(($route.name?.toString() ?? ''))">
            <RouterView/>
        </div>
        <div v-else>
            <section class="w-full py-16 px-6 md:px-20 bg-white dark:bg-gray-950 text-center">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Explore what we can do together
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From backend systems to embedded innovation, we’re here to transform your ideas into real-world solutions.
                </p>
            </section>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <serviceCard v-for="service in services" :description="service.description" :image="service.image" :services="service.services" :title="service.category" :name="service.name" :cta="service.cta"/>
            </div>
            
            <section class="mt-8 px-6 md:px-16 py-12 text-center rounded-xl shadow-lg">
                <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    Not Sure Which Service Fits Your Needs?
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                    Let’s chat and figure out how BitPulse can help you build, scale, or solve a challenge you're facing.
                </p>
                <div
                    @click="uiStore.showModal('consultationForm')"
                    class="inline-block cursor-pointer bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    📅 Book a Free Consultation
                </div>
            </section>

        </div>

    </div>
</template>

<script setup lang="ts">
import serviceCard from '@/components/services/serviceCard.vue';
import { useUiStore } from '@/stores/ui';

let uiStore = useUiStore();

let childRoutes = ["embedded_iot_devt", "backend_systems", "prototyping", "training", "dev_tools"];

let services = [
  {
    image: "backend.svg",
    name: "backend_systems",
    cta: "Discover how we build powerful systems together",
    category: "Backend & Systems Programming",
    description: "Build reliable, blazing-fast backends and system-level tools using Rust.",
    services: [
      "Rust-based backend APIs (Actix, Shuttle)",
      "Custom CLI tools for automation and productivity",
      "System-level integrations for edge computing",
      "WebAssembly-based modules for frontend/backend use"
    ]
  },
  {
    image: "prototype.svg",
    name: "prototyping",
    cta: "Explore how your next idea can take shape with us",
    category: "Custom R&D Prototyping",
    description: "Turn ideas into reality with research-driven hardware/software prototypes.",
    services: [
      "Hardware-software co-design and integration",
      "Smart infrastructure prototyping (e.g. traffic, sensing)",
      "Custom data acquisition systems",
      "Grant-ready technical documentation and research"
    ]
  },
  {
    image: "training.svg",
    name: "training",
    cta: "Let’s shape your learning journey together",
    category: "Technical Mentorship & Training",
    description: "Offer personalized mentorship and educational programs in modern technologies.",
    services: [
      "Rust and embedded programming training",
      "Workshops and bootcamps for institutions",
      "Technical curriculum planning and guidance",
      "Remote/onsite mentorship on project implementation"
    ]
  },
  {
    image: "dev_tools.svg",
    name: "dev_tools",
    cta: "Join us in building tools that empower developers",
    category: "Developer Tools & Open Source Solutions",
    description: "Empower developers through tailored tools and community-driven platforms.",
    services: [
      "Custom Markdown parser and formatting engines",
      "Tooling for Rust-based development workflows",
      "Open-source embedded libraries and contributions",
      "Developer community platform integrations (BitCraft)"
    ]
  },
  {
    image: "embedded_iot.svg",
    cta: "See how we can bring your devices to life",
    name: "embedded_iot_devt",
    category: "Embedded Systems & IoT Development",
    description: "Design and deploy intelligent embedded systems for automation, sensing, and control.",
    services: [
      "Custom IoT solutions (e.g. smart agriculture, health monitors)",
      "Embedded firmware development in Rust",
      "Hardware simulation using Wokwi",
      "Low-power and performance-optimized designs"
    ]
  },
  
]

</script>