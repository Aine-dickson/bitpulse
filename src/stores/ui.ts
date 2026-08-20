import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUiStore = defineStore('ui', () => {

    const modal: Ref<null | string> = ref(null);

    // Context carried into the modal, e.g. { service: 'Embedded & IoT' } when a
    // service detail page opens the quote form. LeadModal seeds matching field
    // names from this, so the visitor never re-states what the page already knows.
    const modalContext: Ref<Record<string, string>> = ref({});

    const infoModal: Ref<null | {message: string, state: 'error' | 'warning' | 'success'}> = ref(null);

    const showModal = (modalName: string, context: Record<string, string> = {}) => {
        modal.value = modalName
        modalContext.value = context
    }

    const hideModal = () => {
        modal.value = null
        modalContext.value = {}
    }

    const showInfoModal = (message: string, state: 'error' | 'warning' | 'success') => {
        infoModal.value = { message, state }
    }

    const hideInfoModal = () => {
        infoModal.value = null
    }

    return {
        modal, modalContext, showModal, hideModal,
        infoModal, showInfoModal, hideInfoModal,
    }
})
