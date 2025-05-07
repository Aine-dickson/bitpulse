<template>
<div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1">
        <HeroSection />
        <ProductPreview />
    </main>
    <SiteFooter />
</div>
</template>

<script setup lang="ts">
import SiteHeader from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import ProductPreview from '../components/productPreview.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>
  