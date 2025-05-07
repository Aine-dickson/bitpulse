<template>
    <footer class="bg-gray-900 text-gray-300 py-12 px-6 md:px-12 lg:px-24">
        <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            <!-- Brand Section -->
            <div>
                <h2 class="text-2xl font-bold text-white mb-2">BitPulse</h2>
                <p class="text-sm text-gray-400">
                    Driving innovation through technology — one solution at a time.
                </p>
            </div>
        
            <!-- Quick Links -->
            <div>
                <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="/" class="hover:underline">Home</a></li>
                    <li><a href="/#sectors" class="hover:underline">Core Sectors</a></li>
                    <li><a href="/#why-bitpulse" class="hover:underline">Why BitPulse</a></li>
                    <li><a href="/#contact" class="hover:underline">Contact</a></li>
                </ul>
            </div>
        
            <!-- Contact Info -->
            <div>
                <h3 class="text-lg font-semibold text-white mb-4">Get in Touch</h3>
                <p class="text-sm">
                    Kampala, Uganda<br />
                    <a href="mailto:contact@bitpulse.dev" class="hover:underline">contact@bitpulse.dev</a>
                </p>
            </div>
        </div>
    
        <!-- Bottom Line -->
        <div class="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
            &copy; {{ year }} BitPulse. All rights reserved.
        </div>
    </footer>
</template>
  
  
<script setup lang="ts">
import { ref } from 'vue';

let year = ref(new Date().getFullYear())

setInterval(() => {
    year.value = new Date().getFullYear()
}, 1000*60*60*24); // Update every 24 hours

</script>