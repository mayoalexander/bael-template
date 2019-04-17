// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSentry from 'vue2-sentry'
import router from './router'
import VueAnalytics from 'vue-analytics'
import VueBrowserUpdate from 'vue-browserupdate'
import 'babel-polyfill'

Vue.use(VueBrowserUpdate, {
  options: {
    // Update options here
    notify: { i: 11, f: 25, o: 17, s: 9, c: 22 }, // Notify out of date on these browser versions
    reminder: 12, // Number of hours that pass before reminding the user again
    reminderClosed: 36, // Number of hours to wait if user explicitly closes the warning
    text: 'Your browser, {brow_name}, is out of date. This site may not function correctly until you update : Click this bar to view the latest update available for your system.', // Custom info to pass to the user
    container: document.body, // DOM element where notification will be injected
    style: 'top', // Where notification renders
    no_permanent_hide: true // take away the option for user to permanently hide message
  },
  test: false
})

let googleAnalyticsToken = process.env.GOOGLE_ANALYTICS_TOKEN

if (process.env.GOOGLE_ANALYTICS_TOKEN === 'UA-84413454-1') {
} else if (process.env.GOOGLE_ANALYTICS_TOKEN === 'UA-84413454-2') {
} else {
  googleAnalyticsToken = 'UA-84413454-2' // Allows page to render in local env with dev tracking
}

Vue.use(VueAnalytics, {
  id: googleAnalyticsToken,
  router
})

Vue.use(VueSentry, {
  protocol: 'https', // Optional: default is https
  key: process.env.SENTRY_URI_KEY,
  project: process.env.SENTRY_PROJECT_ID, // project_id, not name.
  enable: process.env.NODE_ENV === 'production',
  config: {} // Optional: custom config
})

Vue.config.productionTip = false
