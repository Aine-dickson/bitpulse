import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export interface Blog {
    id: string,
    title: string,
    excerpt: string,
    slug: string,
    image: string,
    date: string,
    tags: string[],
    author?: string,  
}

export interface Comment {
    id: string,
    post_id: string,
    username: string,
    content: string,
    inserted_at: string
}

export const useBlogStore = defineStore('blog', () => {
    let posts: Blog[] = [
        {
            id: "e3okrmlk",
            title: "How Embedded Systems are Powering Smart Infrastructure",
            excerpt: "A dive into real-world use cases where embedded tech and IoT are transforming industries…",
            slug: "what-africa-truly-needs-from-its-tech-revolution",
            image: "/blog/featured-smart-infrastructure.jpg",
            date: "2025-05-15",
            tags: ["IoT", "Embedded Systems"]
        },
        {
            id: "d3f4o-erjt",
            title: "Prototyping 101: From Idea to Physical MVP",
            slug: "prototyping-101",
            excerpt: "What to consider before starting your hardware or embedded software prototype.",
            image: "/blog/prototyping.jpg",
            date: "2025-05-10",
            tags: ["Prototyping"]
        },
        {
            id: "vo95irf3-erjt",
            title: "Rust vs C++ for Embedded Systems",
            slug: "rust-vs-c-for-embedded-systems-the-battle-for-the-bare-metal",
            excerpt: "We compare two powerful languages and how they stack up in embedded development.",
            image: "/blog/rust-vs-cpp.jpg",
            date: "2025-05-06",
            tags: ["Embedded Systems"]
        },
        {
            id: "e4t3pi-erjt",
            title: "Launching Open Source Hardware Projects with the Community",
            slug: "open-source-hardware",
            excerpt: "Tips for publishing and managing open-source embedded or tooling projects.",
            image: "/blog/open-source-hardware.jpg",
            date: "2025-04-28",
            tags: ["Hardware Design", "Open Source"]
        },
    ]

    const filterBySearch = ref(false);
    const tags: Ref<string[]> = ref([]);
    const featuredBlogPost: Ref<null | string> = ref("e3okrmlk");
    const postInPreview: Ref<string> = ref("");
    
    let getPostById = (id: string): Blog | undefined => {
        return posts.find(post => post.id === id);
    }
    
    let getPostsByTags = (): Blog[] => {
        return posts.filter(post => post.tags.some(tag => tags.value.includes(tag)));
    }

    let getPostsBySearch = (searchTerm: string): Blog[] => {
        if (!filterBySearch.value || !searchTerm) {
            return posts;
        }
        const lowerSearchTerm = searchTerm.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(lowerSearchTerm) ||
            post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
        );
    }

    const addTagFilter = (filter: string) => {
        tags.value.push(filter);
    }

    const rmTagFilter = (filter: string) => {
        let index = tags.value.findIndex(item=> item == filter);
        if(index != -1){
            tags.value.splice(index, 1);
        }
    }

    const previewPost = (postId: string) => {
        postInPreview.value = postId;
    }

    const toggleFilterBySearch = (state?: boolean) => {
        if (state !== undefined) {
            filterBySearch.value = state;
            return;
        }
        filterBySearch.value = !filterBySearch.value;
    }

    return {
        posts, getPostById, getPostsByTags, postInPreview,
        tags, addTagFilter, rmTagFilter, previewPost,
        featuredBlogPost, filterBySearch, toggleFilterBySearch,
        getPostsBySearch
    }
},
{
    persist: {
        pick: ['tags', 'featuredBlogPost', 'postInPreview', 'filterBySearch'],
    }
}
)