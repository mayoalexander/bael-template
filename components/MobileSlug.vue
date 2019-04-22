<template>
  <v-flex xs10>
    <v-card
      flat
      class="card--flex-toolbar"
    >
      <v-divider class="copper500" />
      <v-content>
        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            id="mobileSlugLeft"
            xs12
            sm12
            md6
            mt-5
            order-xs2
            order-sm2
            order-md1
          >
            <v-content>
              <v-layout
                row
                wrap
                justify-center
              >
                <v-flex class="text-xs-center">
                  <div
                    :class="{'headline': isMobile, 'display-1': !isMobile}"
                    class="text-xs-center"
                  >
                    {{ slugTitle }}
                  </div>
                  <br>
                  <v-card-text class="text-xs-center subheading copper500--text padding-sides-zeropx">
                    <p>
                      {{ paragraphOne }}
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout
                      row
                      wrap
                      justify-space-around
                      class="download-buttons"
                    >
                      <v-flex
                        xs6
                        sm6
                        order-xs1
                        mt-2
                      >
                        <a
                          :href="travisMobileIoSStore"
                          target="_blank"
                        >
                          <img
                            :src="iosStoreBadge"
                            class="apple-store-badge"
                          >
                        </a>
                      </v-flex>
                      <v-flex
                        xs6
                        sm6
                        order-xs2
                        mt-2
                      >
                        <a
                          :href="travisMobileGooglePlay"
                          target="_blank"
                        >
                          <img
                            :src="GooglePlayStoreBadge"
                            class="google-play-store-badge"
                            alt="Get it on Google Play"
                          >
                        </a>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-content>
          </v-flex>
          <v-flex
            id="mobileSlugRight"
            class="text-xs-center"
            xs12
            sm12
            md6
            order-xs1
            order-sm1
            order-md2
          >
            <img
              :src="mobileSlugImg"
              class="trs-mob-img"
              alt="Picture of hands using a mobile app"
            >
          </v-flex>
        </v-layout>
      </v-content>
    </v-card>
  </v-flex>
</template>

<script>
import branding from '@/assets/brandai.json'
const brandImages = branding.lookup.images

export default {
  name: 'MobileSlug',
  data () {
    return {
      travisMobileGooglePlay: process.env.TRAVIS_MOBILE_GOOGLE,
      travisMobileIoSStore: process.env.TRAVIS_MOBILE_ITUNES,
      GooglePlayStoreBadge: brandImages.travisDownloadIconAndroidSvg.url,
      iosStoreBadge: brandImages.travisDownloadIconIosSvg.url,
      mobileSlugImg: brandImages.travisMobileHandsTransparent512X512Png.url,
      slugTitle: 'Our Warehouse In Your Pocket',
      paragraphOne: 'Now you can take Travis Roofing Supply with you!  Our mobile app provides you complete access to our store, as well as a convenient way to check your account on the go.'
    }
  },
  computed: {
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return false
        case 'lg': return false
        case 'xl': return false
      }
      return true
    }
  }
}
</script>

<style scoped>

.trs-mob-img {
  width: 100%;
  height: auto;
  max-width: 512px;
}

p {
  text-align: left !important;
}

.padding-sides-zeropx {
  /* Used to remove default side-padding from vuetify elements */
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
