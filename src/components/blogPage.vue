<template>
    <!-- Preview section when blog is null -->
    <section v-if="!blog" class="blog-preview-empty">
        <div class="blog-preview-empty__icon">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" stroke="#e0e0e0" stroke-width="4"/>
                <path d="M16 24h16M16 30h10" stroke="#bdbdbd" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <h2 class="blog-preview-empty__title">Blog not Found</h2>
        <p class="blog-preview-empty__desc">This was either deleted or never exited. <span @click="$router.push({name: 'blog'})" class="text-orange-600 cursor-pointer hover:underline">See all here</span></p>
    </section>

    <!-- Existing blog preview section -->
    <div v-else class="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <!-- Blog Content -->
        <article class="md:col-span-2">
            <h1 class="text-3xl md:text-4xl font-bold md:font-black text-gray-800 dark:text-gray-200 mb-4 md:mb-8">{{ blog?.title }}</h1>
            <span class="text-white">This {{ slug }}</span>
            <blockquote class="pl-4 my-4 border-s-4 border-gray-300 dark:border-gray-500">
                <p class="text-md italic leading-relaxed text-gray-900 dark:text-gray-500">{{ formatDate(blog?.date || '') }} · {{ blog?.author }}</p>
            </blockquote>
            <hr class="text-gray-300 dark:text-gray-800 my-12" />

            <img :src="blog?.image" class="w-full rounded mb-6" alt="Blog cover" />

            <blog1 v-if="blog?.slug == 'what-africa-truly-needs-from-its-tech-revolution'"/>
            <blog2 v-if="blog?.slug == 'rust-vs-c-for-embedded-systems-the-battle-for-the-bare-metal'"/>

            <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Tags: 
                <span v-for="(tag, index) in blog?.tags" :key="tag" class="text-orange-600 font-semibold">#{{ index+1 == blog?.tags.length ? tag : `${tag}, ` }} </span>
            </p>

            <!-- TODO: Include articles -->
        </article>

        <!-- Comment Section -->
        <aside class="md:col-span-1 dark:text-white">
            <h2 class="text-xl font-semibold mb-4">Comments</h2>

            <!-- New Comment Input -->
            <form @submit.prevent="submitComment" class="mb-6">
                <textarea v-model="content" rows="4" class="w-full p-3 border rounded resize-none" placeholder="Write your comment..."></textarea>
                <div class="flex items-center mt-2 justify-between">
                    <button type="submit" class="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded">
                        Post
                    </button>
                    <span v-if="accountStore.username" class="ml-4 text-sm text-gray-500">Comment as: {{ accountStore.username }}</span>
                    <input v-else v-model="username" type="text" class="w-1/2 p-2 border rounded" placeholder="Username to attach on comment" required/>
                </div>
            </form>

            <!-- Real-time Comment List -->
            <div class="space-y-4">
                <div v-for="comment in comments.sort((a, b) => new Date(b.inserted_at).getTime() - new Date(a.inserted_at).getTime())" :key="comment.id" class="bg-gray-50 dark:bg-slate-900 border rounded-lg p-3 shadow-sm">
                    <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ comment.content }}</p>
                    <p class="text-xs text-gray-500 mt-1">— {{ comment.username }} at {{ formatDate(comment.inserted_at) }}</p>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue'
import blog1 from './blog1.vue';
import blog2 from './blog2.vue';
import { useBlogStore, type Comment } from '@/stores/blog';
import { supabase } from '@/utils/supabase';
import { useAccountStore } from '@/stores/account';
import { useRoute } from 'vue-router';

    const route = useRoute();
    let blogStore = useBlogStore();
    let accountStore = useAccountStore();
    defineProps<{slug: string}>();

    let postId = computed(() => blogStore.postInPreview);
    const blog = computed(() => {
        const slug = route.params.slug as string;
        if (slug) {
            let post = blogStore.posts.find(post => post.slug === slug);
            if (post) {
                blogStore.previewPost(post.id);
                return post;
            }
        }

        return null;
    });

    let comments: Ref<Comment[]> = ref([])

    let formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleString();
    }

    const username = ref('')
    const content = ref('')
    if (accountStore.username) {
        username.value = accountStore.username
    }

    // Load existing comments
    const loadComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId.value)
            .order('inserted_at', { ascending: true })
            if (data) comments.value = data
    }

    // Post a new comment
    const submitComment = async () => {
        if (!username.value || !content.value) return
        accountStore.setUsername(username.value)
        const { error } = await supabase.from('comments').insert({
            post_id: postId.value,
            username: username.value,
            content: content.value,
        })
        content.value = ''
        username.value = ''
        if (error) alert('Error posting comment')
    }

    // Real-time listener
    let channel: any

    onMounted(async () => {
    await loadComments()

    channel = supabase
        .channel('public:comments')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${postId.value}` },
                payload => {
                    const newComment: Comment = {
                        id: payload.new.id,
                        post_id: payload.new.post_id,
                        username: payload.new.username,
                        content: payload.new.content,
                        inserted_at: payload.new.inserted_at
                    };
                    return comments.value.push(newComment);
            }
        )
        .subscribe()
    })

    onUnmounted(() => {
        if (channel) supabase.removeChannel(channel)
    })
</script>

<style scoped>
.blog-preview-empty {
    color: #757575;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.blog-preview-empty__icon {
  margin-bottom: 1rem;
  opacity: 0.7;
}

.blog-preview-empty__title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text-secondary, #757575);
  margin-bottom: 0.5rem;
}

.blog-preview-empty__desc {
  font-size: 1rem;
  color: var(--color-text-tertiary, #bdbdbd);
  margin: 0;
}
</style>
