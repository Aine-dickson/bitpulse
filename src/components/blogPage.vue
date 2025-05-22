<template>
    <div class="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <!-- Blog Content -->
        <article class="md:col-span-2">
            <h1 class="text-3xl md:text-4xl font-bold md:font-black text-gray-800 dark:text-gray-200 mb-4 md:mb-8">{{ blog.title }}</h1>
            
            <blockquote class="pl-4 my-4 border-s-4 border-gray-300 dark:border-gray-500">
                <p class="text-md italic leading-relaxed text-gray-900 dark:text-gray-500">{{ formatDate(blog.date) }} · {{ blog.author }}</p>
            </blockquote>
            <hr class="text-gray-300 dark:text-gray-800 my-12" />

            <img :src="blog.image" class="w-full rounded mb-6" alt="Blog cover" />

            <blog1 v-if="slug == 'what-africa-truly-needs-from-its-tech-revolution'"/>
            <blog2 v-else-if="slug == 'rust-vs-c-for-embedded-systems-the-battle-for-the-bare-metal'"/>

            <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Tags: <span class="text-orange-600 font-semibold">#EmbeddedSystems</span>, <span class="text-orange-600 font-semibold">#IoT</span></p>

            <!-- TODO: Include articles -->
        </article>

        <!-- Comment Section -->
        <aside class="md:col-span-1 dark:text-white">
            <h2 class="text-xl font-semibold mb-4">Comments</h2>

            <!-- New Comment Input -->
            <form @submit.prevent="submitComment" class="mb-6">
                <textarea v-model="newComment" rows="4" class="w-full p-3 border rounded resize-none" placeholder="Write your comment..."></textarea>
                <button type="submit" class="mt-2 cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded">
                    Post
                </button>
            </form>

            <!-- Real-time Comment List -->
            <div class="space-y-4">
                <div v-for="comment in comments" :key="comment.id" class="bg-gray-50 dark:bg-slate-900 border rounded-lg p-3 shadow-sm">
                    <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ comment.text }}</p>
                    <p class="text-xs text-gray-500 mt-1">— {{ comment.user }} at {{ formatDate(comment.timestamp) }}</p>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import blog1 from './blog1.vue';
import blog2 from './blog2.vue';

    defineProps<{slug: string}>()
    let blog = ref({
        title: "How Embedded Systems are Powering Smart Infrastructure",
        content: "<p>A dive into real-world use cases where embedded tech and IoT are transforming industries…</p>",
        image: "/blog/featured-smart-infrastructure.jpg",
        date: "2025-05-15",
        author: "John Doe",
    });

    let newComment = ''
    let comments = [
        {
            id: 1,
            text: "Great article! I learned a lot.",
            user: "Alice",
            timestamp: "2025-05-16T12:34:56Z",
        }
    ]
    let socket = null
    let formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleString();
    }

    let submitComment = () => {
      if (newComment.trim()) {
        const commentData = {
          text: newComment.trim(),
          user: 'Anonymous', // Replace with auth user if available
          timestamp: new Date().toISOString(),
        };
        newComment = '';
      }
    }
</script>
