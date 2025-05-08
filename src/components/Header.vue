<template>
    <nav class="bg-white dark:bg-gray-950 w-full start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://bitpulse.dev/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="../assets/bitpulse logo_transparent.png" class="h-12" alt="BitPulse Logo">
            </a>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button type="button" class="text-white bg-orange-400 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-700">Login</button>
                <button id="sm_nav" data-collapse-toggle="navbar-sticky" type="button" class="inline-flex cursor-pointer items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>

            <!-- Navigation bar -->
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-950 dark:border-gray-700">
                    <li v-for="nav in navigations" :key="nav">
                        <span @click="$router.push({name: nav}); toggleOffMenu()" class="navigation" :class="$route.name == nav ? 'active' : 'dormant'">{{ nav }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const screenWidth = ref(window.innerWidth);
let navigations = ['home', 'services', 'about', 'blog', 'careers', 'contacts'];

let toggleOffMenu = () => {
    const menu = document.getElementById("sm_nav");
    if (screenWidth.value < 768) {
        menu?.click();
    }
};


const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onMounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
    const menu = document.getElementById("navbar-sticky");

    toggleBtn?.addEventListener("click", () => {
      menu?.classList.toggle("hidden");
    });
});
</script>

<style scoped>
@reference "../assets/main.css";
.active {
    @apply text-white bg-orange-400 md:bg-transparent md:text-orange-800 md:p-0 md:dark:text-orange-400
}
.dormant{
    @apply text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-800 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700;
}
.navigation {
    @apply block py-2 px-3 rounded-sm cursor-pointer capitalize;
}
</style>