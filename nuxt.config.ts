// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  css: [
    '~/assets/css/main.css',
    '~/assets/css/animations.css'
  ],

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  app: {
    head: {
      title: 'Abdur Rehman — DevSecOps Engineer',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portfolio of Abdur Rehman, DevSecOps Engineer specializing in Cloud Security, Secure CI/CD Automation, Kubernetes Orchestration, and Infrastructure as Code.'
        },
        { name: 'theme-color', content: '#030712' },
        { property: 'og:title', content: 'Abdur Rehman — DevSecOps Engineer' },
        {
          property: 'og:description',
          content: 'Building secure, automated, and scalable infrastructure for the modern cloud.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/profile.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Abdur Rehman — DevSecOps Engineer' },
        {
          name: 'twitter:description',
          content: 'Building secure, automated, and scalable infrastructure for the modern cloud.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  }
})
