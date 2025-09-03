<template>
    <div class="grid md:grid-cols-2 gap-12">
        <form
            id="mailing_form"
            @submit.prevent="submit"
            class="bg-white dark:bg-gray-900 p-6 shadow-lg rounded-xl space-y-4 relative"
            novalidate
        >
        <!-- Honeypot -->
        <input v-model="honeypot" type="text" class="hidden" tabindex="-1" autocomplete="off" />

        <div>
            <input
                v-model.trim="fullName"
                type="text"
                required
                placeholder="Full Name"
                name="client_name"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                :class="{ 'border-red-500': attempted && !fullName }"
                aria-required="true"
            />
            <p v-if="attempted && !fullName" class="text-xs text-red-500 mt-1">Name is required.</p>
        </div>

        <div>
            <input
                v-model.trim="email"
                type="email"
                required
                placeholder="Email Address"
                name="client_email"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                :class="{ 'border-red-500': attempted && !validEmail }"
                aria-required="true"
            />
            <p v-if="attempted && !validEmail" class="text-xs text-red-500 mt-1">
                Valid email required.
            </p>
        </div>

        <input
            v-model.trim="organization"
            type="text"
            placeholder="Organization (optional)"
            name="client_organization"
            class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div>
            <textarea
                v-model.trim="message"
                placeholder="Your Message"
                rows="4"
                required
                name="client_message"
                class="w-full border border-gray-300 dark:border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                :class="{ 'border-red-500': attempted && !message }"
                aria-required="true"
            ></textarea>
            <p v-if="attempted && !message" class="text-xs text-red-500 mt-1">Message is required.</p>
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button
                type="submit"
                :disabled="submitting || !formOk"
                class="w-full bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-semibold py-3 rounded hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
                <svg
                    v-if="submitting"
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    ></circle>
                    <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <span>{{ submitting ? 'Sending...' : 'Start the Conversation' }}</span>
            </button>
        </div>

        <div aria-live="polite" class="min-h-5 text-sm">
            <p v-if="status === 'success'" class="text-green-600">Message sent! We will reply soon.</p>
            <p v-else-if="status === 'error'" class="text-red-600">
                {{ errorMsg || 'Failed to send. Try again.' }}
            </p>
        </div>
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
                <p class="text-gray-700 mb-2 dark:text-gray-300">
                    Want to explore what we can build together?
                </p>
                <a
                    @click="$router.push('/partner')"
                    class="inline-block bg-orange-800 text-white px-5 py-2 rounded hover:bg-orange-900 transition cursor-pointer"
                >
                Let’s Collaborate
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive form fields
const fullName = ref('')
const email = ref('')
const organization = ref('')
const message = ref('')
const honeypot = ref('') // bots will hopefully fill this in

// State
const submitting = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const attempted = ref(false)

// Derived validations
const emailRegex = /^(?:[a-zA-Z0-9_'^&+%!-]+(?:\.[a-zA-Z0-9_'^&+%!-]+)*|"[^"]+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
const validEmail = computed(() => emailRegex.test(email.value))
const formOk = computed(
    () => fullName.value && validEmail.value && message.value && !honeypot.value,
)

// Endpoint from environment variable
const endpoint = "https://wildcon-tactsunfo-rm554e.ainedixon03.workers.dev/"

interface ContactPayload {
    name: string
    email: string
    organization?: string
    message: string
    meta: {
        userAgent?: string
        path?: string
    }
}

const reset = () => {
    fullName.value = ''
    email.value = ''
    organization.value = ''
    message.value = ''
}

const submit = async () => {
    attempted.value = true
    status.value = 'idle'
    errorMsg.value = ''
    if (!formOk.value) return
    if (honeypot.value) return // spam

    submitting.value = true
    try {
        const payload: ContactPayload = {
            name: fullName.value,
            email: email.value,
            organization: organization.value || undefined,
            message: message.value,
            meta: {
                userAgent: navigator.userAgent,
                path: location.pathname,
            },
        }

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        })

        if (!res.ok) {
            const text = await res.text().catch(() => '')
            throw new Error(text || 'Request failed')
        }

        // Optionally parse JSON
        status.value = 'success'
        reset()
        attempted.value = false
    } catch (e: any) {
        status.value = 'error'
        errorMsg.value = e.message || 'Unknown error'
        console.error('Contact form submission failed', e)
    } finally {
        submitting.value = false
    }
}
</script>
