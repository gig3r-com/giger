import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr(),
        react(),
        VitePWA({
            manifest: {
                theme_color: '#545ae9',
                background_color: '#22193c',
                scope: '',
                start_url: '.',
                display: 'standalone',
                name: 'GIGER',
                short_name: 'GIGER',
                icons: [
                    {
                        src: 'src/assets/android/android-launchericon-48-48.png',
                        sizes: '48x48',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'src/assets/android/android-launchericon-72-72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'src/assets/android/android-launchericon-96-96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'src/assets/android/android-launchericon-144-144.png',
                        sizes: '144x144',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'src/assets/android/android-launchericon-192-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: 'src/assets/android/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'src/assets/ios/16.png',
                        sizes: '16x16',
                        type: 'image/png'
                    },
                    {
                        src: 'src/assets/ios/32.png',
                        sizes: '32x32',
                        type: 'image/png'
                    },
                    {
                        src: 'src/assets/ios/64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'src/assets/ios/128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'src/assets/ios/256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'src/assets/ios/512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
        injectRegister: 'auto',
        registerType: 'autoUpdate'
        })
    ]
});
