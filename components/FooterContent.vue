<template>
  <v-footer
    :height="footerHeight"
    color="success"
    absolute
    class="copper-top"
  >
    <v-content class="secondary--text subheading content-constraint">
      <br>
      <v-layout row>
        <v-flex
          xs4
          offset-xs4
        >
          <div class="text-xs-center mx-auto">
            <ul>
              <li v-if="getCurrentBranch.facebook">
                &nbsp;
                <a
                  :href="'https://www.facebook.com/' + getCurrentBranch.facebook"
                  class="secondary--text"
                  target="_blank"
                >
                  <i class="fab fa-facebook-f fa-2x" />
                </a>
                &nbsp;
              </li>
              <li v-if="getCurrentBranch.yelp">
                &nbsp;
                <a
                  :href="'https://www.yelp.com/biz/' + getCurrentBranch.yelp"
                  class="secondary--text"
                  target="_blank"
                >
                  <i class="fab fa-yelp fa-2x" />
                </a>
                &nbsp;
              </li>
              <li v-if="getCurrentBranch.linkedin">
                &nbsp;
                <a
                  :href="'https://www.linkedin.com/company/' + getCurrentBranch.linkedin"
                  class="secondary--text"
                  target="_blank"
                >
                  <i class="fab fa-linkedin-in fa-2x" />
                </a>
                &nbsp;
              </li>
            </ul>
          </div>
        </v-flex>
      </v-layout>
      <br>
      <v-layout>
        <v-flex
          xs12
          class="text-xs-center"
        >
          <footer-nav-links />
        </v-flex>
      </v-layout>
      <br>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm12
          md3
          class="text-xs-center"
        >
          <br v-if="!getCurrentBranch.slug">
          <br v-if="!getCurrentBranch.slug">
        </v-flex>
        <v-flex
          order-xs3
          xs12
          sm12
          md6
          class="text-xs-center"
        >
          <span v-if="getCurrentBranch.slug">
            <br v-if="this.$vuetify.breakpoint.name === ('sm' || 'xs')">
            <strong v-text="'Travis Roofing Supply'" />
            <br>
            <a
              :href="'https://maps.apple.com/?q=' +getCurrentBranch.name+ '&ll=' + getCurrentBranch.coordinates[0] + ',' + getCurrentBranch.coordinates[1]"
              class="copper300--text"
              target="_blank"
            >
              {{
                getCurrentBranch.street + ', \n' +
                  getCurrentBranch.city + ', ' +
                  getCurrentBranch.state + ' ' +
                  getCurrentBranch.zip_code
              }}
            </a>
            <br>
            <a
              :href="'tel:' + getCurrentBranch.phone_number"
              class="copper300--text"
            >
              {{ getCurrentBranch.phone_number }}
            </a>
            <br>
            <a
              :href="'mailto:' + getCurrentBranch.email"
              class="copper300--text"
            >
              {{ getCurrentBranch.email }}
            </a>
          </span>
          <span v-else>
            <br v-if="this.$vuetify.breakpoint.name === ('sm' || 'xs')">
            <strong v-text="'Travis Roofing Supply'" />
            <br>
          </span>
        </v-flex>
        <v-flex
          order-md3
          xs12
          sm12
          md3
          class="text-xs-center"
        >
          <br v-if="!getCurrentBranch.slug">
          <br v-if="!getCurrentBranch.slug">
        </v-flex>
      </v-layout>
      <br><br>
      <v-layout>
        <v-flex
          xs1
          class="text-xs-center"
        />
        <v-flex
          xs10
          class="text-xs-center"
        >
          <span class="body-2">
            Travis Roofing Supply © {{ new Date().getFullYear() }}
          </span>
          <br><br>
        </v-flex>
        <v-flex
          xs1
          class="text-xs-center"
        />
      </v-layout>
    </v-content>
  </v-footer>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import branding from '@/assets/brandai.json'
import FooterNavLinks from '@/components/FooterNavLinks.vue'

export default {
  components: {
    FooterNavLinks
  },
  data () {
    return {
      footerHeight: null // v-footer height defaults to 32px
    }
  },
  computed: {
    travisWolfFooter () {
      return branding.lookup.logos.travisWolfBlackBadge.url
    },
    ...mapGetters([
      'getCurrentBranch'
    ]),
    userIsMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return false
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
.copper-top {
  border-top: 1px solid #b87333 !important;
}

.footer-copper-badge {
  width: 50px;
  height: auto;
}

footer {
  z-index: 2 !important;
}

/*v-footer element sets these both to 8px, causing inconsistent behavior*/

.footer>*:first-child {
  margin-left: auto !important;
}

.footer>*:last-child {
  margin-right: auto !important;
}

ul {
  list-style-type: none;
}

li {
  display: inline;
}
</style>
