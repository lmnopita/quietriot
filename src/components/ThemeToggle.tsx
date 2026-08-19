import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'quietriot-theme'

const systemTheme = (): Theme =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/**
 * Lets a reader pick light or dark.
 *
 * The app followed the OS setting alone, which sounds respectful and isn't:
 * changing it means digging through system settings, so in practice almost
 * nobody ever sees the other theme. This is read at 11pm on a phone about
 * something upsetting — being able to turn the brightness down (or up, if dark
 * mode is hard to read, which is exactly the complaint that got the chalkboard
 * palette cut) is a comfort control, not decoration.
 *
 * Defaults to the system preference and only overrides once the reader has
 * actually chosen; the choice persists.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(KEY)
    return saved === 'light' || saved === 'dark' ? saved : systemTheme()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        setTheme(next)
        localStorage.setItem(KEY, next)
      }}
    >
      {/* Label names the destination, not the current state — "Light" on a dark
          page reads as the thing you get, which is what people reach for. */}
      {next === 'light' ? 'Light' : 'Dark'}
    </button>
  )
}
