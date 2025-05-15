<template>
    <section class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Bring your idea to life through custom R&D and prototyping.
                </h3>
                <button @click="uiStore.hideModal" type="button" class="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form @submit="submitForm">
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input v-model="form.name" type="text" name="name" id="name" class="input focus:ring-orange-600 focus:border-orange-600" placeholder="Type full name" required="">
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input v-model="form.email" type="email" name="email" id="email" class="input focus:ring-orange-600 focus:border-orange-600" placeholder="aine@bitpulse.dev" required="">
                    </div>
                    <div class="sm:col-span-2">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area of Interest</label>
                        <select v-model="form.category" id="project" class="input bg-gray-800 focus:ring-orange-500 focus:border-orange-500" required>
                            <option disabled value="">Select an area</option>
                            <option value="hardware_software">Hardware + Software Integration</option>
                            <option value="experimentaEmbedded">Experimental Embedded Systems</option>
                            <option value="communications_sys">Communication Systems</option>
                            <option value="consultancy">Rapid Prototyping Consultancy</option>
                            <option value="openInnovation">Open Innovation Projects</option>
                        </select>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project overview</label>
                        <textarea v-model="form.description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Briefly describe what you’re trying to achieve..."></textarea>                    
                    </div>
                </div>
                
                <button type="submit" class="text-white cursor-pointer inline-flex items-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                    <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Start Conversation
                </button>
                <p v-if="submitted" class="text-green-600 mt-4">Thanks for reaching out! We’ll get back to you shortly.</p>
            </form>
        </div>
    </section>

</template>

<script setup>
import { ref } from 'vue';
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();

const submitted = ref(false);

const form = ref({
    name: '',
    email: '',
    category: '',
    description: '',
})

function submitForm() {
    // For now, simulate a submission (could integrate with Formspree, backend, etc.)
    console.log('Partnership Form Submitted:', form);
    submitted.value = true;
    setTimeout(() => {
        submitted.value = false
        form.value = {
            name: '',
            email: '',
            category: '',
            description: '',
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
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 text-gray-900 text-sm block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500;
}
</style>
