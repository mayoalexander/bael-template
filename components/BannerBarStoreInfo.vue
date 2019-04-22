<template>
  <div class="copper500--text">
    <v-container fill-height>
      <v-layout
        row
        wrap
      >
        <v-flex
          id="store-phone"
          xs12
          sm12
          class="text-xs-right text-sm-center store-info"
        >
          <span
            v-if="getCurrentBranch.slug"
            :class="{'caption':isMobile, 'body-1':!isMobile}"
          >
            <a
              :href="'tel:' + getCurrentBranch.phone_number"
              class="copper500--text"
            >
              <i class="fas fa-phone fa-rotate-90" />&nbsp;&nbsp;
              <span v-text="getCurrentBranch.phone_number" />
            </a>
          </span>
        </v-flex>
        <v-flex
          id="store-email"
          xs12
          sm12
          class="text-xs-right text-sm-center store-info"
        >
          <span
            v-if="getCurrentBranch.slug"
            :class="{'caption':isMobile, 'body-1':!isMobile}"
          >
            <a
              :href="'mailto:' + getCurrentBranch.email"
              class="copper500--text"
            >
              <i class="fas fa-envelope" />&nbsp;&nbsp;
              <span v-text="getCurrentBranch.email" />
            </a>
          </span>
        </v-flex>
        <v-flex
          id="store-address"
          xs12
          sm12
          class="text-xs-right text-sm-center store-info"
        >
          <span
            v-if="getCurrentBranch.slug"
            :class="{'caption':isMobile, 'body-1':!isMobile}"
          >
            <a
              :href="'https://maps.apple.com/?q=' +getCurrentBranch.name+ '&ll=' + getCurrentBranch.coordinates[0] + ',' + getCurrentBranch.coordinates[1]"
              class="copper500--text"
              target="_blank"
            >
              <i class="fas fa-map-marker-alt" />&nbsp;&nbsp;
              <span v-text="(getCurrentBranch.street + ', ' + getCurrentBranch.city + ', ' + getCurrentBranch.state + ' ' + getCurrentBranch.zip_code)" />
            </a>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'BannerBarStoreInfo',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getCurrentBranch'
    ]),
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
  }
}
</script>

<style scoped>
.store-info {
  white-space: nowrap;
}

a {
  text-decoration: none;
}

.container {
  padding: 0px 8px 8px 8px;
}
</style>
