<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import blog1 from './blog1.vue'
import blog2 from './blog2.vue'
import blog3 from './blog3.vue'
import blog4 from './blog4.vue'
import { useBlogStore, type Comment } from '@/stores/blog'
import { useAccountStore } from '@/stores/account'
import { supabase } from '@/utils/supabase'
import { SITE_URL } from '@/config/seo'

const route = useRoute()
const blogStore = useBlogStore()
const accountStore = useAccountStore()
defineProps<{ slug: string }>()

const postId = computed(() => blogStore.postInPreview)
const blog = computed(() => {
  const slug = route.params.slug as string
  const post = blogStore.posts.find((p) => p.slug === slug)
  if (post) {
    blogStore.previewPost(post.id)
    return post
  }
  return null
})

// Reactive SEO (updates if the user navigates between posts).
useHead({
  title: () => (blog.value ? `${blog.value.title} · BitPulse` : 'Blog · BitPulse'),
  meta: [
    { name: 'description', content: () => blog.value?.excerpt ?? '' },
    { property: 'og:title', content: () => (blog.value ? `${blog.value.title} · BitPulse` : 'BitPulse') },
    { property: 'og:description', content: () => blog.value?.excerpt ?? '' },
    { property: 'og:type', content: 'article' },
    {
      property: 'og:image',
      content: () => (blog.value?.image ? `${SITE_URL}/${blog.value.image.replace(/^\//, '')}` : `${SITE_URL}/social-preview.png`),
    },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})

const now = ref(new Date())
const comments: Ref<Comment[]> = ref([])
const username = ref(accountStore.username ?? '')
const content = ref('')

const sortedComments = computed(() =>
  [...comments.value].sort(
    (a, b) => new Date(b.inserted_at).getTime() - new Date(a.inserted_at).getTime(),
  ),
)

function articleDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function relativeTime(dateStr: string) {
  const diff = now.value.getTime() - new Date(dateStr).getTime()
  const min = Math.floor(diff / 60000)
  const hr = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${min} minute${min === 1 ? '' : 's'} ago`
  if (diff < 86400000) return `${hr} hour${hr === 1 ? '' : 's'} ago`
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

async function loadComments() {
  const { data } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId.value)
    .order('inserted_at', { ascending: true })
  if (data) comments.value = data
}

async function submitComment() {
  if (!username.value || !content.value) return
  accountStore.setUsername(username.value)
  const { error } = await supabase.from('comments').insert({
    post_id: postId.value,
    username: username.value,
    content: content.value,
  })
  content.value = ''
  if (error) alert('Sorry — your comment could not be posted. Please try again.')
}

let channel: ReturnType<typeof supabase.channel> | null = null
let interval: ReturnType<typeof setInterval> | undefined

onMounted(async () => {
  await loadComments()
  interval = setInterval(() => (now.value = new Date()), 30000)

  channel = supabase
    .channel('public:comments')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${postId.value}` },
      (payload) => {
        comments.value.push(payload.new as Comment)
      },
    )
    .subscribe()
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (channel) supabase.removeChannel(channel)
})
</script>

<template>
  <!-- Not found -->
  <section v-if="!blog" class="mx-auto flex max-w-[640px] flex-col items-center px-6 py-28 text-center">
    <div class="grid h-14 w-14 place-items-center rounded-full border border-line text-ink-3">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8M8 15h5" stroke-linecap="round" />
      </svg>
    </div>
    <h1 class="mt-6 text-[1.6rem] text-ink">Post not found</h1>
    <p class="mt-2 text-ink-3">
      This was either removed or never existed.
      <RouterLink to="/blogs" class="text-accent-deep hover:underline">See all posts</RouterLink>
    </p>
  </section>

  <!-- Article -->
  <div v-else class="mx-auto grid max-w-[1120px] gap-10 px-6 py-14 lg:grid-cols-3">
    <article class="lg:col-span-2">
      <RouterLink to="/blogs" class="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent-deep hover:underline">
        ← All posts
      </RouterLink>
      <h1 class="mt-5 text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] text-ink">{{ blog.title }}</h1>
      <p class="mt-4 font-mono text-[0.8rem] text-ink-3">
        {{ articleDate(blog.date) }}<span v-if="blog.author"> · {{ blog.author }}</span>
      </p>
      <img :src="`/${blog.image}`" class="mt-8 w-full rounded-lg border border-line" :alt="blog.title" />

      <div class="article mt-4">
        <blog1 v-if="blog.slug == 'what-africa-truly-needs-from-its-tech-revolution'" />
        <blog2 v-if="blog.slug == 'rust-vs-c-for-embedded-systems-the-battle-for-the-bare-metal'" />
        <blog3 v-if="blog.slug == 'prototyping-101'" />
        <blog4 v-if="blog.slug == 'open-source-hardware'" />
      </div>

      <div class="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
        <span
          v-for="tag in blog.tags"
          :key="tag"
          class="rounded border border-line-2 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.05em] text-accent-deep"
        >
          #{{ tag }}
        </span>
      </div>
    </article>

    <!-- Comments -->
    <aside class="lg:col-span-1">
      <h2 class="text-[1.3rem] text-ink">Comments</h2>

      <form class="mt-4 flex flex-col gap-3" @submit.prevent="submitComment">
        <textarea
          v-model="content"
          rows="4"
          required
          class="w-full resize-none rounded-md border border-line-2 bg-surface px-3.5 py-2.5 text-[0.95rem] text-ink focus:border-accent focus:outline-none"
          placeholder="Write your comment…"
        />
        <div class="flex items-center gap-3">
          <button type="submit" class="btn btn-primary">Post</button>
          <span v-if="accountStore.username" class="text-[0.85rem] text-ink-3">
            as {{ accountStore.username }}
          </span>
          <input
            v-else
            v-model="username"
            type="text"
            required
            class="min-w-0 flex-1 rounded-md border border-line-2 bg-surface px-3 py-2 text-[0.9rem] text-ink focus:border-accent focus:outline-none"
            placeholder="Your name"
          />
        </div>
      </form>

      <div class="mt-6 flex flex-col gap-3">
        <p v-if="!sortedComments.length" class="text-[0.9rem] text-ink-3">Be the first to comment.</p>
        <div
          v-for="c in sortedComments"
          :key="c.id"
          class="rounded-lg border border-line bg-surface p-4"
        >
          <div class="flex items-baseline justify-between gap-2">
            <span class="text-[0.85rem] font-semibold capitalize text-ink">{{ c.username }}</span>
            <span class="font-mono text-[0.66rem] text-ink-3">{{ relativeTime(c.inserted_at) }}</span>
          </div>
          <p class="mt-1.5 whitespace-pre-wrap text-[0.92rem] text-ink-2">{{ c.content }}</p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.article {
  color: var(--color-ink-2);
  font-size: 1.02rem;
  line-height: 1.75;
}
.article :deep(h2) {
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.01em;
  margin: 2.2rem 0 1rem;
}
.article :deep(h3) {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-ink);
  margin: 1.6rem 0 0.75rem;
}
.article :deep(p) {
  margin-bottom: 1rem;
}
.article :deep(ul),
.article :deep(ol) {
  padding-left: 1.4rem;
  margin-bottom: 1rem;
}
.article :deep(li) {
  margin-bottom: 0.4rem;
}
.article :deep(a) {
  color: var(--color-accent-deep);
  text-decoration: underline;
}
.article :deep(blockquote) {
  border-inline-start: 3px solid var(--color-accent);
  background: var(--color-plate-1);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0 6px 6px 0;
}
.article :deep(hr) {
  border: 0;
  border-top: 1px solid var(--color-line);
  margin: 2.5rem 0;
}
.article :deep(img) {
  border-radius: 8px;
  margin: 1.5rem 0;
}
</style>
