<template>
    <div class="grid md:grid-cols-2 gap-12">
        <form id="mailing_form" @submit.prevent = mail class="bg-white dark:bg-gray-900 p-6 shadow-lg rounded-xl space-y-4">
            <input
                type="text" required placeholder="Full Name" id="client_name" name="client_name"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="email" required placeholder="Email Address" id="client_email" name="client_email"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="text" placeholder="Organization (optional)" id="client_organization" name="client_organization"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
                placeholder="Your Message" rows="4" required id="client_message" name="client_message"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
                type="submit"
                class="w-full bg-orange-500 cursor-pointer text-white font-semibold py-3 rounded hover:bg-orange-600 transition"
            >
                Start the Conversation
            </button>
        </form>
    
        <!-- Contact Info & Secondary CTA -->
        <div class="flex flex-col justify-center text-left space-y-6">
            <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-1 dark:text-white">Email</h3>
                <p class="text-gray-600 dark:text-gray-400">contact@bitpulse.dev</p>
            </div>
            <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-1 dark:text-white">Location</h3>
                <p class="text-gray-600 dark:text-gray-400">Kampala, Uganda</p>
            </div>
            <!-- Optional Phone -->
            <div>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">Phone</h3>
                <p class="text-gray-600 dark:text-gray-400">+256 777 5328 58</p>
            </div>
            <div class="pt-4">
                <p class="text-gray-700 mb-2 dark:text-gray-300">Want to explore what we can build together?</p>
                <a
                href="mailto:contact@bitpulse.dev"
                class="inline-block bg-orange-800 text-white px-5 py-2 rounded hover:bg-orange-900 transition"
                >
                Let’s Collaborate
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let mail = async() => {
    alert("Your message has been sent!")
}
</script>