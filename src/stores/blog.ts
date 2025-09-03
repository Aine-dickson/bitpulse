import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
// Import posts metadata from JSON so it's single source of truth (also used by prerender script)
import postsData from '@/content/posts.json'

export interface Blog {
  id: string
  title: string
  excerpt: string
  slug: string
  image: string
  date: string
  tags: string[]
  author?: string
}

export interface Comment {
  id: string
  post_id: string
  username: string
  content: string
  inserted_at: string
}

export const useBlogStore = defineStore(
  'blog',
  () => {
    // Cast imported JSON to Blog[]
    const posts: Blog[] = postsData as any as Blog[]

    const filterBySearch = ref(false)
    const tags: Ref<string[]> = ref([])
    const featuredBlogPost: Ref<null | string> = ref('e3okrmlk')
    const postInPreview: Ref<string> = ref('')

    let getPostById = (id: string): Blog | undefined => {
      return posts.find((post) => post.id === id)
    }

    let getPostsByTags = (): Blog[] => {
      return posts.filter((post) => post.tags.some((tag) => tags.value.includes(tag)))
    }

    let getPostsBySearch = (searchTerm: string): Blog[] => {
      if (!filterBySearch.value || !searchTerm) {
        return posts
      }
      const lowerSearchTerm = searchTerm.toLowerCase()
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerSearchTerm) ||
          post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm)),
      )
    }

    const addTagFilter = (filter: string) => {
      tags.value.push(filter)
    }

    const rmTagFilter = (filter: string) => {
      let index = tags.value.findIndex((item) => item == filter)
      if (index != -1) {
        tags.value.splice(index, 1)
      }
    }

    const previewPost = (postId: string) => {
      postInPreview.value = postId
    }

    const toggleFilterBySearch = (state?: boolean) => {
      if (state !== undefined) {
        filterBySearch.value = state
        return
      }
      filterBySearch.value = !filterBySearch.value
    }

    return {
      posts,
      getPostById,
      getPostsByTags,
      postInPreview,
      tags,
      addTagFilter,
      rmTagFilter,
      previewPost,
      featuredBlogPost,
      filterBySearch,
      toggleFilterBySearch,
      getPostsBySearch,
    }
  },
  {
    persist: {
      pick: ['tags', 'featuredBlogPost', 'postInPreview', 'filterBySearch'],
    },
  },
)
