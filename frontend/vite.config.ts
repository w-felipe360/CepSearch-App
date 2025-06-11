import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview:{
  port: 3000,
  strictPort: true,
  },
  server: {
  port: 3000,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:3000",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})