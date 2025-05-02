import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiPost } from '@/router/api'

export const useCounterStore = defineStore('account', () => {

    async function subscribe(email: string) {
        try {
            await apiPost('/api/subscribe', { email })
        } catch (error) {
            console.error("Subscription Error:", error)
            throw error
        }
    }

  return { subscribe }
})
