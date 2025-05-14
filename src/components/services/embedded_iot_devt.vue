<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <!-- Hero Section -->
        <section class="px-6 md:px-16 py-16 bg-gradient-to-b from-orange-50 to-white dark:from-orange-900 via-gray-900 dark:to-gray-900">
            <div class="max-w-5xl mx-auto text-center">
                <h1 class="text-4xl font-bold text-orange-600 mb-4">
                    Embedded Systems Development
                </h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Powering innovation from the core — We build secure, efficient, and scalable embedded systems that drive modern devices, automation, and IoT.
                </p>
            </div>
        </section>

        <!-- Value Proposition -->
        <section class="px-6 md:px-16 py-12 bg-gradient-to-b dark:from-gray-900 via-gray-900 dark:to-gray-800">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-semibold mb-6">Why Choose BitPulse for Embedded Systems?</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-xl font-semibold mb-2">💡 Precision Engineering</h3>
                    <p class="mb-4">From firmware to circuit design, we ensure every byte and wire is optimized for real-world performance.</p>

                    <h3 class="text-xl font-semibold mb-2">🛡️ Rust-Powered Safety</h3>
                    <p class="mb-4">Our use of Rust unlocks safety guarantees, concurrency, and performance that's perfect for critical systems.</p>

                    <h3 class="text-xl font-semibold mb-2">🔗 Seamless Hardware-Software Integration</h3>
                    <p class="mb-4">We handle both the hardware and software — ensuring smooth development and compatibility.</p>
                </div>
                <div class="rounded-lg overflow-hidden shadow-xl">
                    <img src="/iot.png" alt="Embedded Systems Example" class="w-full h-auto" />
                </div>
            </div>
        </div>
        </section>

        <!-- Services Breakdown -->
        <section class="px-6 md:px-16 py-12 bg-gray-100 dark:bg-gray-800">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                            <h3 class="font-bold text-lg mb-2">Custom Firmware</h3>
                            <p>Reliable code in C/C++/Rust tailored for your specific hardware.</p>
                        </div>
                        <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                            <h3 class="font-bold text-lg mb-2">Microcontroller Solutions</h3>
                            <p>Designs built on ESP32, STM32, AVR, and other industry favorites.</p>
                        </div>
                        <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                            <h3 class="font-bold text-lg mb-2">IoT & Automation</h3>
                            <p>Connect and control systems at scale — smart, efficient, and secure.</p>
                        </div>
                    </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="px-6 md:px-16 py-12 bg-orange-600 text-white">
            <div class="max-w-4xl mx-auto text-center space-y-6">
                <h2 class="text-3xl font-bold">Let's Build Something Brilliant</h2>
                <p class="text-lg">Ready to take your product or idea to the next level? Talk to our team about building your next embedded system.</p>
                <div class="flex flex-col md:flex-row justify-center gap-4">
                    <RouterLink
                        to="/contacts"
                        class="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Book a Consultation
                    </RouterLink>
                    <RouterLink
                        to="/services"
                        class="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
                    >
                        Explore Other Services
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>
