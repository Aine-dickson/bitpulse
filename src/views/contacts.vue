<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Intro -->
        <section class="text-center py-12 px-4">
            <h1 class="text-3xl font-bold text-gray-800">Let’s Connect</h1>
            <p class="mt-2 text-gray-600 text-lg max-w-2xl mx-auto">
                Whether you have a project in mind, a partnership to explore, or simply a question — we’re here to talk.
            </p>
        </section>

        <!-- Main contact content -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-8">
            <div class="col-span-3 md:col-span-2">
                <!-- Contact Methods -->
                <section class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8 text-gray-700">
                    <div class="text-center">
                        <h3 class="text-xl font-semibold">Email Us</h3>
                        <p class="mt-1">hello@bitpulse.dev</p>
                    </div>
                    <div class="text-center">
                        <h3 class="text-xl font-semibold">Phone</h3>
                        <p class="mt-1">+256 xxx xxx xxx</p>
                    </div>
                    <div class="text-center">
                        <h3 class="text-xl font-semibold">Location</h3>
                        <p class="mt-1">Kampala, Uganda<br />(Remote & Hybrid Friendly)</p>
                    </div>
                </section>
        
                <!-- Contact Form -->
                <section class="max-w-3xl mx-auto px-4 py-10">
                    <form @submit.prevent="sendMessage" class="space-y-6 bg-white p-6 shadow-md rounded-md">
                        <div>
                            <label class="block text-gray-700">Name</label>
                            <input v-model="form.name" type="text" required class="w-full border border-gray-300 p-2 rounded" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Email</label>
                            <input v-model="form.email" type="email" required class="w-full border border-gray-300 p-2 rounded" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Message</label>
                            <textarea v-model="form.message" required rows="5" class="w-full border border-gray-300 p-2 rounded"></textarea>
                        </div>
                            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Send Message
                        </button>
                    </form>
                </section>
        
                <!-- Social Links -->
                <section class="text-center py-8">
                    <h3 class="text-lg text-gray-600 mb-2">Follow Us</h3>
                    <div class="flex justify-center space-x-4 text-blue-600 text-2xl">
                        <a href="https://twitter.com/bitpulse_dev" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="https://github.com/bitpulse-dev" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                </section>
            </div>

            <!-- Live Chat panel -->
            <div>
                <div >
                    <form @submit.prevent="submitForm" class="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
                    <label class="block">
                        <span class="text-gray-700">Your Name</span>
                        <input type="text" v-model="form.name" class="mt-1 block w-full rounded border-gray-300" required />
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Email</span>
                        <input type="email" v-model="form.email" class="mt-1 block w-full rounded border-gray-300" required />
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Inquiry Type</span>
                        <select v-model="form.type" class="mt-1 block w-full rounded border-gray-300">
                        <option>General Inquiry</option>
                        <option>Request a Quote</option>
                        <option>Support</option>
                        <option>Partnership</option>
                        <option>Media</option>
                        <option>Feedback</option>
                        </select>
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Message</span>
                        <textarea v-model="form.message" class="mt-1 block w-full rounded border-gray-300" rows="4" required></textarea>
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Company (optional)</span>
                        <input type="text" v-model="form.company" class="mt-1 block w-full rounded border-gray-300" />
                    </label>

                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Send Message
                    </button>
                    </form>
                    <span>
                        <span class="font-medium">Log in</span> to access live chat support or <a href="#" class="text-blue-600 hover:underline">book a quick consultation</a>.
                    </span>
                </div>

                <div >
                    <!-- Placeholder Chat UI for logged-in users -->
                    <div class="bg-white border border-gray-200 rounded-lg shadow p-6 h-96 flex flex-col justify-between">
                    <div class="text-gray-600">You're now connected to BitPulse Support. Start your conversation below:</div>
                    <div class="flex-1 my-4 overflow-auto bg-gray-50 p-2 rounded">[ Chat Thread Placeholder ]</div>
                        <div class="flex">
                            <input v-model="chatMessage" type="text" class="flex-1 border rounded-l px-3 py-2 border-gray-300" placeholder="Type your message..." />
                            <button @click="sendChat" class="bg-blue-600 text-white px-4 rounded-r">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Footer -->
        <section class="text-center py-12 bg-gray-100">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Not sure where to begin?</h3>
            <p class="text-gray-600 mb-6">Let’s help you figure it out in a free, no-pressure consultation.</p>
            <a href="/consultation" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded">
                Book a Free Consultation
            </a>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const sendMessage = () => {
  // Replace with actual form integration logic
  alert('Message sent! We’ll be in touch soon.');
};
</script>
