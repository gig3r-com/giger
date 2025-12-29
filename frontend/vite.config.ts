import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export type TenantId = 'gigerDefault' | 'cityOfChange';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const tenant = (env.VITE_TENANT as TenantId) || 'gigerDefault';

    // Point @theme to the right SCSS file
    const themeFile =
        tenant === 'cityOfChange'
            ? path.resolve(__dirname, 'src/coc-variables.scss')
            : path.resolve(__dirname, 'src/variables.scss');

    const gigFile =
        tenant === 'cityOfChange'
            ? path.resolve(__dirname, 'src/apps/giger/gig/gig.coc.scss')
            : path.resolve(__dirname, 'src/apps/giger/gig/gig.giger.scss');

    const gigHeaderFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/apps/giger/gig/gig-header/gig-header.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/apps/giger/gig/gig-header/gig-header.giger.scss'
              );

    const gigBodyFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/apps/giger/gig/gig-body/gig-body.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/apps/giger/gig/gig-body/gig-body.giger.scss'
              );
    const gigNewMsgFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/shared/components/new-msg/new-msg.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/shared/components/new-msg/new-msg.giger.scss'
              );
    const mainMenuFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/shared/components/main-menu/main-menu.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/shared/components/main-menu/main-menu.giger.scss'
              );
    const charSummaryFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/apps/myId/char-summary/char-summary.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/apps/myId/char-summary/char-summary.giger.scss'
              );
    const myIdNavigationFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/apps/myId/my-id-navigation/my-id-navigation.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/apps/myId/my-id-navigation/my-id-navigation.giger.scss'
              );
    const gigListFile =
        tenant === 'cityOfChange'
            ? path.resolve(__dirname, 'src/apps/giger/gigList/gigList.coc.scss')
            : path.resolve(
                  __dirname,
                  'src/apps/giger/gigList/gigList.giger.scss'
              );
    const sliderFile =
        tenant === 'cityOfChange'
            ? path.resolve(
                  __dirname,
                  'src/shared/components/slider/slider.coc.scss'
              )
            : path.resolve(
                  __dirname,
                  'src/shared/components/slider/slider.giger.scss'
              );

    // Optional: per-tenant PWA colors/names
    const pwaByTenant = {
        gigerDefault: {
            theme_color: '#545ae9',
            background_color: '#22193c',
            name: 'GIGER',
            short_name: 'GIGER'
        },
        cityOfChange: {
            theme_color: '#ff7a00',
            background_color: '#0c0c10',
            name: 'City of Change',
            short_name: 'CoC'
        }
    } satisfies Record<TenantId, Partial<ManifestOptions>>;

    const manifest: Partial<ManifestOptions> = {
        ...pwaByTenant[tenant],
        scope: '',
        start_url: '.',
        display: 'standalone'
    };

    return {
        resolve: {
            alias: {
                '@theme': themeFile,
                '@gig-style': gigFile,
                '@gig-header-style': gigHeaderFile,
                '@gig-body-style': gigBodyFile,
                '@gig-new-msg-style': gigNewMsgFile,
                '@main-menu-style': mainMenuFile,
                '@char-summary-style': charSummaryFile,
                '@my-id-navigation-style': myIdNavigationFile,
                '@gig-list-style': gigListFile,
                '@slider-style': sliderFile
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // Make the theme variables available in every .scss file
                    // (Sass caches modules, so multiple @use calls are fine)
                    additionalData: `@use "@theme" as *;`
                }
            }
        },
        plugins: [
            svgr(),
            react(),
            VitePWA({
                manifest,
                injectRegister: 'auto',
                registerType: 'autoUpdate'
            })
        ]
    };
});
