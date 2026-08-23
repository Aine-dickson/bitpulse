import { onMounted, ref } from 'vue'

/**
 * Theme for the field-services pages (/field, /kits, /kits/:slug).
 *
 * Deliberately separate from the studio's `useTheme`. The two audiences are
 * different people: a head teacher arriving from a business card should not
 * inherit the dark mode an engineer set while reading the Lab. These pages
 * always open light, matching the printed collateral.
 *
 * The attribute is stamped on <html> before first paint by the inline script in
 * index.html, so a returning visitor's choice never flashes. This composable
 * only mirrors that into reactive state and handles the toggle.
 */

const STORAGE_KEY = 'bitpulse-field-theme'

export function useFieldTheme() {
  const theme = ref<'light' | 'dark'>('light')

  function stamp(t: 'light' | 'dark') {
    document.documentElement.setAttribute('data-field-theme', t)
  }

  onMounted(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'dark') theme.value = 'dark'
    } catch {
      /* private mode or storage blocked: light is the right fallback */
    }
    stamp(theme.value)
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      /* the choice just will not persist; the page still switches */
    }
    stamp(theme.value)
  }

  return { theme, toggle }
}
