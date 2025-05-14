<template>
    <section class="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow text-white">
        <h2 class="text-3xl font-semibold mb-4 text-center">Partner With BitPulse</h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-6 text-lg">
            We value partnerships that drive real change. Whether you're a startup, NGO, institution,
            or established tech company, we’re open to meaningful collaborations.
        </p>
        <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="form.name" type="text" required placeholder="Full Name" class="input" />
                <input v-model="form.company" type="text" required placeholder="Organization / Company" class="input" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="form.email" type="email" required placeholder="Email Address" class="input" />
                <input v-model="form.phone" type="tel" placeholder="Phone Number (optional)" class="input" />
            </div>
            <select v-model="form.interest" required class="input bg-gray-800">
                <option disabled value="">Select Partnership Interest</option>
                <option>Reseller or Referral Partner</option>
                <option>Joint Product Development</option>
                <option>Technology & Infrastructure</option>
                <option>Educational / Training Collaboration</option>
                <option>Media / Marketing Partnership</option>
                <option>Other (Specify below)</option>
            </select>
            
            <textarea v-model="form.message" required rows="4" placeholder="Tell us more about your partnership idea..." class="input"></textarea>
            <input v-model="form.website" type="url" placeholder="Website or Profile (optional)" class="input" />

            <button type="submit" class="bg-orange-500 text-white py-3 px-6 rounded-xl hover:bg-orange-600 cursor-pointer">
                Start the Conversation
            </button>

            <p v-if="submitted" class="text-green-600 mt-4">Thanks for reaching out! We’ll get in touch within 1–2 business days.</p>
        </form>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
  website: ''
});

const submitted = ref(false);

function submitForm() {
    // For now, simulate a submission (could integrate with Formspree, backend, etc.)
    console.log('Partnership Form Submitted:', form);
    submitted.value = true;
    setTimeout(() => {
        submitted.value = false
        form.value = {
            name: '',
            company: '',
            email: '',
            phone: '',
            interest: '',
            message: '',
            website: ''
        };
        setTimeout(() => {
            uiStore.hideModal();
        }, 1000);
    }, 3000);
}
</script>

<style scoped>
@reference "../assets/main.css";
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black;
}
</style>
