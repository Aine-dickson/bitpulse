<template>
    <div class="bg-gray-950 px-6 md:pl-6 py-12" id="contacts-section">
        <!-- Page title and intro -->
        <div class="space-y-2 text-center md:w-2xl mx-auto mb-12 px-4">
            <h1 class="text-3xl font-bold text-gray-200">Get in Touch</h1>
            <p class="text-gray-400">
                Need help, looking to collaborate, or want a quote? Choose the kind of support you need to
                proceed. Logged-in users can enjoy real-time live chat.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Left section: Contact Category Selection -->
            <div class="w-full lg:col-span-2">
                <!-- Category selection prompt -->
                <div class="w-full space-y-6">
                    <p class="text-gray-300 font-semibold mb-3">
                        Select a category so we can connect you to the right support.
                    </p>

                    <!-- Responsive grid -->
                    <div id="scrollContainer" class="flex overflow-x-auto space-x-4 md:space-x-0 md:overflow-visible md:grid md:grid-cols-2 md:gap-8 md:py-6 md:mt-4">
                        <!-- Left Column -->
                        <div class="h-min items-start md:relative md:h-[5rem] md:w-[90%] md:mt-32 lg:mt-8 flex space-x-4 md:space-x-0">
                            <div
                                v-for="(category, index) in isLargeScreen || !isMediumScreen ? categories[0] : categoriesAll"
                                :key="category.id"
                                @click="selectCategory(category.id)"
                                :id="category.id"
                                class="category group"
                                :class="selectedCategory === category.id ? 'selected' : 'unselected'"
                                :style="{
                                zIndex: (categories[0].length + 10) - index,
                                transform: isMediumScreen
                                    ? `translateY(-${index * 30}px) translateX(${index * 10}px)`
                                    : 'none'
                                }"
                            >
                                <h2 class="font-semibold text-orange-600">{{ category.title }}</h2>
                                <p class="text-sm text-gray-400">{{ category.desc }}</p>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div v-if="isLargeScreen || !isMediumScreen" class="h-min items-start md:relative md:h-[5rem] md:w-[90%] md:mt-24 lg:mt-8 flex space-x-4 md:space-x-0">
                            <div
                                v-for="(category, index) in categories[1]"
                                :key="category.id"
                                :id="category.id"
                                :style="{
                                zIndex: categories[1].length - index,
                                transform: isMediumScreen
                                    ? `translateY(-${index * 30}px) translateX(${index * 10}px)`
                                    : 'none'
                                }"
                                @click="selectCategory(category.id)"
                                class="category group"
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
                        <label
                            v-for="subtype in (categoriesAll.find(category => category.id === selectedCategory)?.subtypes || [])"
                            :key="subtype"
                            class="inline-flex items-center"
                        >
                            <input
                                type="radio"
                                class="form-radio text-orange-600"
                                name="subReason"
                                :value="subtype"
                            />
                            <span class="ml-2 text-sm text-gray-300">{{ subtype }}</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Right section: Consultation Form / Live Chat -->
            <div class="w-full md:w-[80%] mx-auto">
                <!-- For non-logged in users -->
                <div v-if="!loggedIn">
                <h2 class="text-xl text-gray-300 font-semibold mb-3">Quick Consultation</h2>
                <form class="space-y-4 xs:w-[25rem] xs:max-md:mt-8 w-full mx-auto md:w-full text-gray-300 p-6 rounded shadow bg-slate-950 border border-slate-700">
                    <input type="text" placeholder="Full Name" class="w-full border px-3 py-2 rounded" required/>
                    <input type="email" placeholder="Email Address" class="w-full border px-3 py-2 rounded" required/>
                    <select class="w-full border px-3 py-2 rounded" required>
                        <option disabled selected>Select Topic of Concern</option>
                        <option>General Inquiry</option>
                        <option>Project Discussion</option>
                        <option>Quote Request</option>
                        <option>Technical Help</option>
                        <option>Other</option>
                    </select>
                    <textarea placeholder="Tell us a bit about your need..." class="w-full border px-3 py-2 rounded h-32" required></textarea>
                    <button type="submit" class="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">
                        Submit Request
                    </button>
                </form>
                <p class="text-sm text-gray-500 mt-4 text-center">
                    Want real-time support?
                    <router-link to="/login" class="text-orange-600 underline">Log in or create an account</router-link>
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
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
import { ref, computed, type Ref, onMounted, onUnmounted } from 'vue'

const selectedCategory: Ref<string | null> = ref(null)
const loggedIn = ref(false)
const isMediumScreen = ref(window.innerWidth >= 640);
const isLargeScreen = ref(window.innerWidth >= 1024);

const categories: Ref<{ id: string, title: string, desc: string, subtypes: string[] }[][]> = ref([
  [
    {
        id: 'business',
        title: 'Business & Project Inquiries',
        desc: 'Discuss a custom solution or collaboration',
        subtypes: [
            "Request a Quote",
            "Custom Solution Inquiry",
            "Schedule a Discovery Call",
            "R&D or Technical Consultation"
        ]
    },
    {
        id: 'product',
        title: 'Product/Service Purchase & Support',
        desc: 'Need help with one of our tools or platforms?',
        subtypes: [
            "Request a Product Demo",
            "Order/Delivery Inquiry",
            "Technical Support",
            "Request Documentation / Datasheets"
        ]
    },
    {
        id: 'careers',
        title: 'Careers & Collaboration',
        desc: 'Seeking to join or collaborate with us?',
        subtypes: [
            "Job Application",
            "Freelance/Partner Collaboration",
            "Mentorship or Internship Opportunities"
        ]
    },
  ],
  [
    {
        id: 'training',
        title: 'Training & Events',
        desc: 'Schedule mentorship, workshops, or speaking engagements?',
        subtypes: [
            "Book a Training Session",
            "Request a Speaker",
            "Education Partnership"
        ]
    },
    {
        id: 'community',
        title: 'Community & Open Source',
        desc: 'Engage with our community or contribute to open source',
        subtypes: [
            "Join the Community",
            "Open Source Contribution",
            "Community Support Request"
        ]
    },
    {
        id: 'general',
        title: 'General Questions & Press',
        desc: 'Explore collaborative opportunities with BitPulse',
        subtypes: [
            "Ask a Question",
            "Media/Press Inquiry",
            "Feedback & Suggestions"
        ]
    },
  ],
])

const categoriesAll = ref([
  ...categories.value[0],
  ...categories.value[1],
]);

const scrollToElement = (id: string) => {
    const targetElement = document.getElementById(id);
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer && targetElement) {
        scrollContainer.scrollTo({
            left: targetElement.offsetLeft - scrollContainer.offsetLeft,
            behavior: 'smooth'
        });
    }
};

const updateScreenSize = () => {
    isMediumScreen.value = window.innerWidth >= 768;
    isLargeScreen.value = window.innerWidth >= 1024;
    if (
        
        selectedCategory.value !== null &&
        categoriesAll.value.some((item) => item.id === selectedCategory.value)
    ) {
        selectCategory(selectedCategory.value);
    }
};

onMounted(() => {
    const categoryElement = document.getElementById('contacts-section');
    if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth'});
    }
    window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

const selectCategory = (id: string) => {
    let collection = [];
    if( isMediumScreen.value && !isLargeScreen.value) {
        collection = [categoriesAll.value];
    } else {
        collection = categories.value;
    }
    for (let columnIndex = 0; columnIndex < collection.length; columnIndex++) {
        const column = collection[columnIndex]
        const itemIndex = column.findIndex((item) => item.id === id)

        // If the item is found, move it to the top of the column and update the selected category
        if (itemIndex !== -1) {
            selectedCategory.value = id

            if(!isMediumScreen.value) {
                setTimeout(() => {
                    scrollToElement(id)
                }, 5)
                break
            }
            const item = column.splice(itemIndex, 1)[0]
            column.unshift(item)
            setTimeout(() => {
                scrollToElement(id)
            }, 5)
            break
        }
    }
}
</script>

<style scoped>
@reference '../assets/main.css';

.category {
  @apply p-4 w-[20rem] border rounded shadow hover:shadow-md cursor-pointer md:transition-transform duration-300 md:absolute;
}

.category.selected {
  @apply border-orange-400 bg-orange-950;
}

.category.selected > p {
  @apply text-gray-200;
}

.category.selected > h2 {
  @apply text-white;
}

.category.unselected {
  @apply bg-slate-950 hover:bg-slate-900 border-slate-700;
}

.category.unselected > p {
  @apply truncate group-hover:md:whitespace-normal group-hover:md:overflow-visible group-hover:md:text-clip;
}

.category:hover {
  z-index: 30 !important;
}
</style>
