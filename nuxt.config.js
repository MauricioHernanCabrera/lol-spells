import colors from "vuetify/es5/util/colors";

const page = {
  title: "LoL Spells",
  shortName: "LoL Spells",
  description: "Aplicación para temporizar los hechizos de league of legends",
  safeImg: {
    url: `/lol-spells/images/safe_image.png`,
    alt: "Image of LoL Spells"
  },
  favicon: `/lol-spells/images/logo.ico`,
  author: `Mauricio Hernan Cabrera`
};

export default {
  target: "static",

  router: {
    base: "/lol-spells/"
  },

  head: {
    title: page.title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google", content: "notranslate" },
      { hid: "author", name: "author", content: `${page.author}` },
      {
        hid: "description",
        name: "description",
        content: `${page.description}`
      },
      { hid: "twitter-card", name: "twitter:card", content: "summary" },
      { hid: "twitter-title", name: "twitter:title", content: `${page.title}` },
      {
        hid: "twitter-description",
        name: "twitter:description",
        content: `${page.description}`
      },

      {
        hid: "twitter-image",
        name: "twitter:image",
        content: `${page.safeImg.url}`
      },
      {
        hid: "twitter-image-alt",
        name: "twitter:image:alt",
        content: `${page.safeImg.alt}`
      },
      { hid: "og-type", property: "og:type", content: "website" },
      { hid: "og-title", property: "og:title", content: `${page.title}` },
      { hid: "og-image", property: "og:image", content: `${page.safeImg.url}` },
      {
        hid: "og-site_name",
        property: "og:site_name",
        content: `${page.title}`
      },
      {
        hid: "og-description",
        property: "og:description",
        content: `${page.description}`
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: page.favicon },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/scss/styles.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~plugins/ga.js", mode: "client" },
    { src: "~plugins/init-state.js", mode: "client" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  workbox: {
    cacheAssets: false,
    offline: false
  },

  manifest: {
    name: page.title,
    short_name: page.shortName,
    lang: "en-US",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0F0713",
    theme_color: "#0F0713"
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
