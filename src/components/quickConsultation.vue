<!-- TODO -->
<template>
  <form @submit.prevent="submitForm" class="bg-white shadow p-6 rounded space-y-4">
    <h3 class="text-lg font-semibold">Quick Consultation Request</h3>
    <input v-model="form.name" type="text" placeholder="Your Name" class="input" required />
    <input v-model="form.email" type="email" placeholder="Your Email" class="input" required />
    <select v-model="form.reason" class="input" required>
      <option value="" disabled selected>Reason for Contact</option>
      <option>General Inquiry</option>
      <option>Service Request</option>
      <option>Support</option>
      <option>Partnership</option>
    </select>
    <textarea v-model="form.message" placeholder="Tell us more..." class="input" rows="4"></textarea>
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
      Send Request
    </button>
    <p v-if="status" class="text-sm mt-2 text-green-600">{{ status }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  reason: '',
  message: ''
})

const status = ref('')

function submitForm() {
  // Simulate submit
  setTimeout(() => {
    status.value = 'We’ve received your message. We’ll get back to you shortly!'
    form.value = { name: '', email: '', reason: '', message: '' }
  }, 1000)
}
</script>

<style scoped>
@reference "../assets/main.css";
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 text-sm;
}
</style>
