<template>
    <div class="h-full overflow-y-auto no-scroll max-w-6xl mx-auto px-4 py-10" id="blog-section">
        <!-- Page Header -->
        <header class="mb-10 text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-2 dark:text-white">Insights & Resources</h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">Explore thoughts, guides, case studies, and updates from the BitPulse team.</p>
        </header>

        <!-- Featured Blog Post -->
        <section v-if="featured" class="mb-12 bg-gray-100 dark:bg-slate-800 rounded-lg p-6 md:flex gap-6 items-center">
            <img src="../assets/profile.png" alt="Featured Blog" class="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0" />
            <div class="md:w-1/2">
                <p class="text-orange-500 text-lg font-medium uppercase mb-2">Featured</p>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ featured.title }}</h2>
                <p class="text-gray-600 mb-4 dark:text-gray-400">{{ featured.excerpt }}</p>
                <router-link :to="{name: 'blog_post', params: {slug: featured.slug}}" @click="blogStore.previewPost(featured.id)" class="inline-block text-orange-600 font-semibold hover:underline">Read More →</router-link>
            </div>
        </section>

        <!-- Filters -->
        <div class="flex items-center space-x-2 mb-8">
            <div v-if="isSearch == false" @click="toggleSearch" class="p-2 rounded-lg bg-orange-500 w-fit h-fit cursor-pointer">
                <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            
            <form v-else class="w-2xl md:min-w-md transition-opacity duration-300 ease-in-out" @submit.prevent="searchWord">
                <div class="flex">
                    <label for="location-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button @click="toggleSearch" class="shrink-0 z-10 inline-flex cursor-pointer items-center p-2.5 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                    <div class="relative w-full">
                        <input v-model="searchTarget" @input="searchWord" type="search" id="location-search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-orange-500 focus:outline-none" placeholder="Search for blog posts" />
                        <button type="submit" class="absolute cursor-pointer top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-orange-700 rounded-e-lg border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>

            <!-- Filter tags -->
            <div class="flex space-x-2 overflow-x-auto thin-scroll w-full h-fit">
                <button v-for="tag in tags" :key="tag" @click="switchFilter(tag)" class="tag" :class="blogStore.tags.includes(tag) ? 'active-filter' : 'inactive-filter'">{{ tag }}</button>
            </div>
        </div>
    

        <!-- Blog List -->
        <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            <div v-if="posts.length == 0" class="col-span-3 text-center p-8 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <p class="text-gray-600 dark:text-gray-400">No matching blog posts found. Please check back later.</p>
            </div>
            <div v-for="post in posts" :key="post.slug" class="bg-white dark:bg-gray-900 border rounded-lg shadow-sm hover:shadow-md transition">
                <img src="../assets/profile.png" alt="Blog Thumbnail" class="w-full h-48 object-cover rounded-t-lg" />
                <div class="p-4">
                    <p class="text-sm text-gray-500 dark:text-gray-300 mb-1">{{ formatDate(post.date) }}</p>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ post.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ post.excerpt }}</p>
                    <router-link :to="{name: 'blog_post', params: {slug: post.slug}}" @click="blogStore.previewPost(post.id)" class="text-orange-600 font-medium hover:underline text-sm">Continue Reading →</router-link>
                </div>
            </div>
        </div>

        <!-- CTA (Optional) -->
        <div class="mt-16 text-center bg-orange-50 dark:bg-orange-950 p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Stay in the Loop</h4>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Get the latest insights from our team. No spam, just value.</p>
            <button class="px-6 py-2 bg-orange-600 text-white cursor-pointer font-semibold rounded hover:bg-orange-700 transition">Subscribe to Newsletter</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useBlogStore } from '@/stores/blog';

    let blogStore = useBlogStore();
    let isSearch = ref(false);
    let searchTarget = ref("");

    let searchWord = () => {
        blogStore.toggleFilterBySearch(searchTarget.value.trim().length > 0);
    }

    let switchFilter = (tag: string) => {
        let search = blogStore.tags.find(item => item == tag);
        if(search) {
            blogStore.rmTagFilter(tag);
            return;
        }
        blogStore.addTagFilter(tag)
    }

    let toggleSearch = () => {
        isSearch.value = !isSearch.value;
    }

    let featured = computed(() => {
        let postId = blogStore.featuredBlogPost;
        if(!postId) return null;
        let blog = blogStore.posts.find(item => item.id == postId);
        if(!blog) return null;
        return blog;
    })

    let posts = computed(() => {
        const hasSearch = blogStore.filterBySearch && searchTarget.value.trim().length > 0;
        const hasTags = blogStore.tags.length > 0;

        if (hasSearch) {
            return blogStore.getPostsBySearch(searchTarget.value);
        }

        if (hasTags) {
            return blogStore.getPostsByTags();
        }

        return blogStore.posts;
    });

    let formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    let tags = [
        "Embedded Systems",
        "IoT",
        "Prototyping",
        "Open Source",
        "Hardware Design",
        "Software Development",
        "Case Studies",
        "Tech Insights"
    ]

    onMounted(() => {
        const categoryElement = document.getElementById('blog-section');
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth'});
        }
    });
</script>

<style scoped>
    @reference "../assets/main.css";

    .inactive-filter {
        @apply bg-gray-200 dark:bg-slate-800;
    }
    .active-filter {
        @apply bg-orange-300 dark:bg-orange-600;
    }
    .tag {
        @apply w-fit whitespace-nowrap px-4 py-1 mb-2 rounded-full text-sm cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900;
    }

</style>