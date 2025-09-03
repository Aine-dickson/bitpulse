<template>
    <div class="flex-1 relative h-full overflow-y-auto no-scroll" id="home-section">
        <HeroSection />
        <productPreview />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import HeroSection from '../components/HeroSection.vue'
import productPreview from '../components/ProductPreview.vue'

onMounted(() => {
    const categoryElement = document.getElementById('home-section');
    if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth'});
    }
});

</script>
  