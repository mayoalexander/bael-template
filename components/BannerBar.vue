<template>
  <v-toolbar
    :height="bannerHeight"
    :scroll-off-screen="false"
    :scroll-threshold="scrollThreshold"
    xs12
    class="accent copper-bottom"
    flat
  >
    <v-snackbar
      v-model="snackbar.status"
      :timeout="snackbar.timeout"
      top
      color="travisBrandxx"
    >
      {{ announcementText }}
      <v-btn
        dark
        flat
        color="travisBrand"
        @click="goToAnnouncement()"
      >
        View Details
      </v-btn>
    </v-snackbar>

    <v-layout
      row
      wrap
      justify-space-between
      class="banner-bar-content"
      pt-2
    >
      <v-flex
        id="bbar-box-left"
        :class="{'ml-2': !isMobile, 'ml-2': isMobile}"
        xs2
        sm2
        md5
        lg5
        xl5
      >
        <travis-logo />
      </v-flex>
      <v-spacer v-if="this.$vuetify.breakpoint.name === 'xs'" />
      <v-flex
        id="bbar-box-right"
        xs9
        sm9
        md6
        lg6
        xl6
      >
        <v-layout
          id="bbar-right-interior-layout"
          row
          wrap
        >
          <v-flex
            v-if="isMobile"
            id="bbar-store-info-row"
            sm8
            order-xs2
            order-sm2
          >
            <banner-bar-store-info />
          </v-flex>
          <v-flex
            id="bbar-action-items-row"
            sm12
            order-xs1
            order-sm1
          >
            <v-toolbar
              :height="actionTBarHeight"
              :class="{'toolbar--extended': !isMobile}"
              class="transparent"
              flat
            >
              <v-spacer class="hidden-xs-only" />
              <banner-bar-buttons />
              <v-layout
                v-if="!isMobile"
                slot="extension"
                row
                justify-end
              >
                <desktop-nav
                  v-if="announcements"
                  :announcements="announcements"
                />
              </v-layout>
            </v-toolbar>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import cookies from 'js-cookie'
import request from '@/request.js'
import TravisLogo from '@/components/TravisLogo.vue'
import DesktopNav from '@/components/DesktopNav.vue'
import BannerBarStoreInfo from '@/components/BannerBarStoreInfo.vue'
import BannerBarButtons from '@/components/BannerBarButtons.vue'

export default {
  name: 'BannerBar',
  components: {
    TravisLogo,
    DesktopNav,
    BannerBarStoreInfo,
    BannerBarButtons
  },
  data () {
    return {
      announcements: false,
      snackbar: {
        status: false,
        timeout: 9000
      },
      scrollThreshold: 350 // default is 300. 0 is instant. 50 - 100 is decent
    }
  },
  computed: {
    bannerHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 128 // (250 if you return to stacking)
        case 'sm':
          return 128
        case 'md':
          return 128
        case 'lg':
          return 128
        case 'xl':
          return 128
      }
      return false
    },
    announcementText () {
      var item = this.getLatestAnnouncement
      return (item ? item.title : '')
    },
    getLatestAnnouncement () {
      if (this.announcements) {
        return this.announcements.slice(-1).pop()
      } else {
        return false
      }
    },
    actionTBarHeight () {
      // (not mobile height: 114/2) (mobile height: (114/2) * (2/3))
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 38
        case 'sm':
          return 38
        case 'md':
          return 57
        case 'lg':
          return 57
        case 'xl':
          return 57
      }
      return false
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
      }
      return false
    }
  },
  created: function () {
    this.getAnnouncements({
      launchAnnouncement: true
    })
  },
  methods: {
    async getAnnouncements (options) {
      var data = await request.getAnnouncements()
      this.announcements = data
      if (options.launchAnnouncement) {
        this.launchAnnouncement()
      }
      return data
    },
    async getContent () {
      var allPosts = await request.getAllPosts()
      this.posts = allPosts
      return allPosts
    },
    launchAnnouncement () {
      // if annoucement exists
      // if (this.announcements) {
      if (this.getLatestAnnouncement) {
        // console.log('a new annoucement exists!')
        if (this.checkIfHasNeverSeenBefore(this.getLatestAnnouncement)) {
          // console.log('this browser has never been shown the latest notification.!')
          setTimeout(() => {
            // console.log('show annoucement!')
            this.snackbar.status = true
          }, 2000)
        }
      }
    },
    checkIfHasNeverSeenBefore (announcement) {
      // TRUE = yes the user has never seen this post before, return true
      var result = true
      if (cookies.getJSON('latest_snackbar_alert')) {
        if (announcement.id === cookies.getJSON('latest_snackbar_alert')) {
          result = false
        }
      }
      // cookies.set('latest_snackbar_alert', announcement.id)
      return result
    },
    goToAnnouncement () {
      this.snackbar = false
      this.$router.push({ path: '/spotlight/' + this.announcements[0].id })
    }
  }
}
</script>

<style scoped>
.copper-bottom {
  border-bottom: 1px solid #b87333 !important;
}

.banner-bar-content {
  max-width: 1440px;
  margin: auto !important;
}

.spacer {
  margin-left: 8px !important;
}
</style>
