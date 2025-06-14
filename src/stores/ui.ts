import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUiStore = defineStore('ui', () => {

    const modal: Ref<null | string> = ref(null);
    
    const infoModal: Ref<null | {message: string, state: 'error' | 'warning' | 'success'}> = ref(null);

    const showModal = (modalName: string) => {
        modal.value = modalName
    }

    const hideModal = () => {
        modal.value = null 
    }

    const showInfoModal = (message: string, state: 'error' | 'warning' | 'success') => {
        infoModal.value = { message, state }
    }

    const hideInfoModal = () => {
        infoModal.value = null
    }
    
    return { 
        modal, showModal, hideModal, 
        infoModal, showInfoModal, hideInfoModal, 
    }
})
