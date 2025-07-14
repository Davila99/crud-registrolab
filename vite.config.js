import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
, tailwindcss(),
 VitePWA({
      registerType: 'autoUpdate', // Auto-actualización en producción
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'], // Archivos estáticos
      manifest: {
        name: 'SIRELAB - URACCAN',
        short_name: 'SIRELAB',
        description: 'Sistema de Reservación de Laboratorios',
        theme_color: '#003366', // Color de la app
        icons: [
          {
            src: '/pwa-192x192.png', // Ruta relativa desde public/
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
})
