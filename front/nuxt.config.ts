// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'fade', mode: 'out-in' }
    },
    tailwindcss: {
        cssPath: "~/assets/css/main.css",
        configPath: "tailwind.config.js",
        exposeConfig: false,
        injectPosition: 0,
        viewer: true,
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
        ],
    },
    components: {
        global: true,
        dirs: ['~/components']
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    // vite: {
    //     server: {
    //         proxy: {
    //             "^/api/.*": {
    //                 target: "https://local.zombocom.app/api/register",
    //                 changeOrigin: true,
    //                 secure: false,
    //                 rewrite: (path) => path.replace(/^\/api/, ""),
    //             },
    //         },
    //     },
    // },

    runtimeConfig: {
        apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
        public: {
            apiUrl: process.env.API_URL,
            socketUrl: process.env.SOCKET_URL
        }
    },
});
