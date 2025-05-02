<template>
    <div class="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-30">
        <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,300 Q100,280 200,300 T400,300 T600,300 T800,300" stroke="#3B82F6" stroke-width="2" fill="none" />
            <path d="M0,320 Q100,300 200,320 T400,320 T600,320 T800,320" stroke="#3B82F6" stroke-width="1.5" fill="none" />
            <path d="M0,340 Q100,320 200,340 T400,340 T600,340 T800,340" stroke="#3B82F6" stroke-width="1" fill="none" />
        </svg>
    </div>

    <img src="../assets/bitpulse_monogram_transparent.png" alt="BitPulse Logo" class="h-24 mb-6 z-10" />
    <h1 class="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 z-10">
        BitPulse is Launching Soon
    </h1>
    <p class="text-gray-600 text-lg mb-8 max-w-xl z-10">
        A new wave of innovation is coming — powerful systems, smart infrastructure, and purposeful technology for the world and beyond.
    </p>

    <form class="w-full max-w-md z-10" @submit.prevent="notifyMe">
        <div class="flex items-center border-b border-gray-300 py-2">
            <input
                v-model="email"
                class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                placeholder="Enter your email to get notified"
                aria-label="Email"
            />
            <button
                class="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded cursor-pointer transition duration-200 ease-in-out"
                type="submit"
            >
                Notify Me  
            </button>
        </div>
    </form>

    <div class="mt-10 text-gray-500 text-sm z-10">
        &copy; 2025 BitPulse. All rights reserved.
    </div>
</div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/utils/supabase';

let email = ref('');

let notifyMe = async() => {
    if (email.value.length > 0 && email.value.includes('@')) {
        const { data, error } = await supabase
            .from('subscriptions')
            .insert([{ email_address: email.value }]);

        if (error) {
            console.error('Subscription failed:', error.message)
        } else {
            email.value = ''
        }
    } else {
        alert('Please enter a valid email address.');
    }
};
</script>
  
<style scoped>
  /* You can add transitions or animations here later */
</style>
  