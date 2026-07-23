import { ref } from 'vue'

// Light-first theme. The site always loads in light; dark is opt-in and
// persisted. A tiny no-flash script in index.html applies the stored choice
// before paint, so this composable only mirrors + updates that state.

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'bitpulse-theme'
const theme = ref<Theme>('light')
let hydrated = false

function apply(next: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', next)
  }
}

export function useTheme() {
  // Hydrate once on the client from the persisted choice.
  if (!hydrated && typeof window !== 'undefined') {
    hydrated = true
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      theme.value = stored === 'dark' ? 'dark' : 'light'
    } catch {
      theme.value = 'light'
    }
    apply(theme.value)
  }

  function setTheme(next: Theme) {
    theme.value = next
    apply(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable — non-fatal */
    }
  }

  function toggle() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggle }
}
