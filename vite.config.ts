import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    // Nested working copies may contain another src/ tree. Excluding them
    // prevents duplicate test collection and misleading test totals.
    exclude: [...configDefaults.exclude, '**/.claude/**'],
  },
})
