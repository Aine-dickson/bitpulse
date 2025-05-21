<template>
    <div class="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <!-- Blog Content -->
        <article class="md:col-span-2">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">{{ blog.title }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">{{ formatDate(blog.date) }} · {{ blog.author }}</p>
            <img :src="blog.image" class="w-full rounded mb-6" alt="Blog cover" />

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
