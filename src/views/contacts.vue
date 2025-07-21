<template>
  <div class="bg-gray-950 px-6 md:pl-6 py-12">
    <!-- Page title and intro -->
    <div class="space-y-2 text-center md:w-2xl mx-auto mb-12 px-4">
      <h1 class="text-3xl font-bold text-gray-200">Get in Touch</h1>
      <p class="text-gray-400">
        Need help, looking to collaborate, or want a quote? Choose the kind of support you need to
        proceed. Logged-in users can enjoy real-time live chat.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <!-- Left section: Contact Category Selection -->
      <div class="w-full sm:col-span-2">
        <!-- Category selection prompt -->
        <div class="w-full space-y-6">
          <p class="text-gray-300 font-semibold mb-3">
            Select a category so we can connect you to the right support.
          </p>

          <!-- Responsive grid -->
          <div class="grid grid-cols-2 gap-8 py-6 mt-4">
            <!-- Left Column -->
            <div class="relative h-[5rem] w-[90%] mt-8">
              <div
                v-for="(category, index) in categories[0]"
                :key="category.id"
                @click="selectCategory(category.id)"
                class="category"
                :class="selectedCategory === category.id ? 'selected' : 'unselected'"
                :style="{
                  zIndex: categories[0].length - index,
                  transform: `translateY(-${index * 30}px) translateX(${index * 10}px)`,
                }"
              >
                <h2 class="font-semibold text-orange-600">{{ category.title }}</h2>
                <p class="text-sm text-gray-400">{{ category.desc }}</p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="relative h-min w-full">
              <div
                v-for="(category, index) in categories[1]"
                :key="category.id"
                :style="{
                  zIndex: categories[1].length - index,
                  transform: `translateY(-${index * 30}px) translateX(${index * 5}px)`,
                }"
                @click="selectCategory(category.id)"
                class="category"
                :class="selectedCategory === category.id ? 'selected' : 'unselected'"
              >
                <h2 class="font-semibold text-orange-600">{{ category.title }}</h2>
                <p class="text-sm text-gray-400">{{ category.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Subcategory: radio buttons -->
        <div class="my-4">
          <p class="text-gray-300 font-medium mb-2">Choose what best describes your request:</p>
          <div class="flex gap-3 flex-wrap">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio text-orange-600"
                name="subReason"
                value="Feature Request"
              />
              <span class="ml-2 text-sm text-gray-300">Feature Request</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio text-orange-600"
                name="subReason"
                value="Quote for Embedded System"
              />
              <span class="ml-2 text-sm text-gray-300">Quote for Embedded System</span>
            </label>
            <!-- Add other radio inputs dynamically if needed -->
          </div>
        </div>
      </div>

      <!-- Right section: Consultation Form / Live Chat -->
      <div class="w-full md:w-[80%] mx-auto">
        <!-- For non-logged in users -->
        <div v-if="!loggedIn">
          <h2 class="text-xl text-gray-300 font-semibold mb-3">Quick Consultation</h2>
          <form
            class="space-y-4 text-gray-300 p-6 rounded shadow bg-slate-950 border border-slate-700"
          >
            <input
              type="text"
              placeholder="Full Name"
              class="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              class="w-full border px-3 py-2 rounded"
              required
            />
            <select class="w-full border px-3 py-2 rounded" required>
              <option disabled selected>Select Topic of Concern</option>
              <option>General Inquiry</option>
              <option>Project Discussion</option>
              <option>Quote Request</option>
              <option>Technical Help</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Tell us a bit about your need..."
              class="w-full border px-3 py-2 rounded h-32"
              required
            ></textarea>
            <button
              type="submit"
              class="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
            >
              Submit Request
            </button>
          </form>
          <p class="text-sm text-gray-500 mt-4 text-center">
            Want real-time support?
            <router-link to="/login" class="text-orange-600 underline"
              >Log in or create an account</router-link
            >
            to access our live chat.
          </p>
        </div>

        <!-- For logged-in users -->
        <div v-else class="p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4 text-gray-300">Live Chat</h2>
          <!-- Placeholder for chat widget or component -->
          <div class="h-64 border rounded flex items-center justify-center text-gray-400">
            Chat Interface Placeholder
          </div>
        </div>
      </div>
    </div>

    <!-- Direct contact options -->
    <div class="mt-8 text-gray-300">
      <h3 class="text-lg font-semibold mb-4">Reach us directly</h3>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div class="bg-slate-950 border border-gray-700 rounded p-4 text-center cursor-pointer">
          <p class="font-bold text-orange-800">Email</p>
          <p class="text-xs text-gray-400">hello@bitpulse.dev</p>
        </div>
        <div class="bg-slate-950 border border-gray-700 rounded p-4 text-center cursor-pointer">
          <p class="font-bold text-orange-800">WhatsApp</p>
          <p class="text-xs text-gray-400">+256 700 000000</p>
        </div>
        <div class="bg-slate-950 border border-gray-700 rounded p-4 text-center cursor-pointer">
          <p class="font-bold text-orange-800">Phone</p>
          <p class="text-xs text-gray-400">+256 414 000000</p>
        </div>
        <div class="bg-slate-950 border border-gray-700 rounded p-4 text-center cursor-pointer">
          <p class="font-bold text-orange-800">Location</p>
          <p class="text-xs text-gray-400">Kampala, Uganda</p>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-3">
        Your privacy is our priority. Information you share is protected and used solely to help
        you. Expect a response within 24–48 hours.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'

const selectedCategory: Ref<string | null> = ref(null)
const loggedIn = ref(false)

const categories = ref([
  [
    {
      id: 'business',
      title: 'Business & Project Inquiries',
      desc: 'Discuss a custom solution or collaboration',
    },
    {
      id: 'product',
      title: 'Product/Service Purchase & Support',
      desc: 'Need help with one of our tools or platforms?',
    },
    {
      id: 'careers',
      title: 'Careers & Collaboration',
      desc: 'Seeking to join or collaborate with us?',
    },
  ],
  [
    {
      id: 'training',
      title: 'Training & Events',
      desc: 'Schedule mentorship, workshops, or speaking engagements?',
    },
    {
      id: 'general',
      title: 'General Questions & Press',
      desc: 'Explore collaborative opportunities with BitPulse',
    },
  ],
])

const selectCategory = (id: string) => {
  for (let columnIndex = 0; columnIndex < categories.value.length; columnIndex++) {
    const column = categories.value[columnIndex]
    const itemIndex = column.findIndex((item) => item.id === id)

    if (itemIndex !== -1) {
      // Remove the item from its current position
      const item = column.splice(itemIndex, 1)[0]
      // Add it to the beginning of the column
      column.unshift(item)
      selectedCategory.value = id
      break
    }
  }
}
</script>

<style scoped>
@reference '../assets/main.css';

.category {
  @apply p-4 w-full border rounded shadow hover:shadow-md cursor-pointer transition-transform duration-300 absolute;
}

.category.selected {
  @apply border-orange-700 bg-slate-950;
}

.category.unselected {
  @apply bg-slate-900 hover:bg-slate-800 border-slate-700;
}

.category:hover {
  z-index: 30 !important;
}
</style>
