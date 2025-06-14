import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiPost } from '@/router/api'

export const useAccountStore = defineStore('account', () => {
    let username = ref<string | null>(null);

    async function subscribe(email: string) {
        try {
            await apiPost('/api/subscribe', { email })
        } catch (error) {
            console.error("Subscription Error:", error)
            throw error
        }
    }

    function setUsername(name: string) {
        username.value = name
    }

  return { subscribe, username, setUsername }
},
{
    persist: {
        pick: ['username'],
    }
}
)
