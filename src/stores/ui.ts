import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUiStore = defineStore('ui', () => {

    const modal: Ref<null | string> = ref(null)
    const showModal = (modalName: string) => {
        modal.value = modalName
    }
    const hideModal = () => {
        modal.value = null 
    }
    
  return { modal, showModal, hideModal }
})
