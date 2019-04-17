var siteInfo = require('./content/setup/info.json');
console.log(siteInfo)
var glob = require('glob');
var path = require('path');

// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
var dynamicRoutes = getDynamicPaths({
  '/blog': 'blog/posts/*.json',
  '/page': 'page/posts/*.json',
  '/category': 'categories/posts/*.json',
  '/tagged': 'tags/posts/*.json'
});


module.exports = {
  mode: "universal",
  /*
  ** Headers of the page
  */
transition: { mode: "in-out"},
env: {
  NODE_ENV: process.env.NODE_ENV || 'development',
  GOOGLE_ANALYTICS_TOKEN: process.env.GOOGLE_ANALYTICS_TOKEN || 'fish',
  SENTRY_URI_KEY: process.env.SENTRY_URI_KEY || '20ca4e025ad2402b8dbe773f3845e0cc',
  SENTRY_PROJECT_ID: process.env.SENTRY_PROJECT_ID || '1215646',
  TRAVIS_API_ENDPOINT: process.env.TRAVIS_API_ENDPOINT || 'https://api.dev.travissupply.com',
  TRAVIS_HOWLER_API: process.env.TRAVIS_HOWLER_API || 'https://api.dev.travissupply.com/howler/v1/',
  TRAVIS_HOWLER_API_TOKEN: process.env.TRAVIS_HOWLER_API_TOKEN || 'Token ddc02d9ee40988f4f73f3f3fb5446b783195f258',
  TRAVIS_TAG_LINE: process.env.TRAVIS_TAG_LINE || 'YOUR LOCAL ROOFING DISTRIBUTOR',
  IP_FETCH_API: process.env.IP_FETCH_API || 'https://api.ipify.org/',
  TRAVIS_LOCATION_API: process.env.TRAVIS_LOCATION_API || 'https://api.dev.travissupply.com/location/v1/',
  GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY || 'AIzaSyA7PoPJWclO823y6nJig87TZge-uSoAFYg',
  TRAVIS_ACCTS_PAYABLE_EMAIL: process.env.TRAVIS_ACCTS_PAYABLE_EMAIL || 'ap@travissupply.com',
  TRAVIS_ACCTS_RECEIVABLE_EMAIL: process.env.TRAVIS_ACCTS_RECEIVABLE_EMAIL || 'credit@travissupply.com',
  TRAVIS_SUPPORT_LINK: process.env.TRAVIS_SUPPORT_LINK || 'https://trssupply.zendesk.com/hc/en-us/sections/115000816911-Customer-Support-',
  TRAVIS_PAYMENT_PORTAL: process.env.TRAVIS_PAYMENT_PORTAL || 'https://secure.billtrust.com/trssupply/ig/signin',
  TRAVIS_MOBILE_GOOGLE: process.env.TRAVIS_MOBILE_GOOGLE || 'https://play.google.com/store/apps/details?id=com.trssupply.mobile.travis&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
  TRAVIS_MOBILE_ITUNES: process.env.TRAVIS_MOBILE_ITUNES || 'https://itunes.apple.com/us/app/travis-mobile/id1309410080?ls=1&amp;mt=8'
},
  head: {
    title: siteInfo.sitename,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: siteInfo.sitedescription }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Archivo+Black' }
    ]
  },
  css: ['~/assets/style/app.styl'],
  // icon: {
  //   iconSrc: `${siteInfo.siteicon}`
  //  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: ['@nuxtjs/markdownit', '@nuxtjs/pwa','@nuxtjs/axios'],
  markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true


  },
  manifest: {
    name: siteInfo.sitename,
    short_name: siteInfo.sitename,
    description: siteInfo.sitedescription,
    lang: 'en'
  },
  workbox: {
    fetch: true,
    runtimeCaching: [
      {
        urlPattern: '/images/uploads/.*',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'image-cache',
          cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 86400
          }
        }
      }
    ]
  },

  /*
  ** Route config for pre-rendering
  */
 router: {
  scrollBehavior: function (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
middleware: ['title']
 },
  generate: {
    routes: dynamicRoutes
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuefuse',{
    src: "~/plugins/moment",
    ssr: false
  },
  '@/plugins/vuetify'],


  /*
  ** Build configuration
  */
  build: {
    extractCSS: true
    /*
    ** Run ESLint on save
    */

  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
