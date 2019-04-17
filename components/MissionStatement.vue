<template>
  <v-flex
    xs10
    class="text-xs-center"
  >
    <v-container
      fill-height
      class="padding-sides-zeropx"
    >
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex
          xs12
          md6
          order-xs2
          order-md1
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              xs12
              class="text-xs-center px-3"
            >
              <div
                :class="{'headline': isMobile, 'display-1': !isMobile}"
                class="text-xs-center mb-3 mt-5"
              >
                {{ slugTitle }}
              </div>
              <p class="copper500--text subheading">
                {{ paragraphOne }}
              </p>
              <p class="copper500--text subheading">
                {{ paragraphTwo }}
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          xs12
          md6
          order-xs1
          order-md2
        >
          <img
            :src="missionIMG"
            class="mission-slug-image"
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import branding from '@/assets/brandai.json'
const brandImages = branding.lookup.images

export default {
  name: 'MissionStatement',
  data () {
    return {
      missionIMG: brandImages.travisWebMissionTalk512X506Png.url,
      slugTitle: 'Distribution With Purpose',
      paragraphOne: 'We provide our contractors with the best communication in the industry using current technology.  Our mission is to be the most agile, communicative, and responsive roofing distribution company in all of our markets.',
      paragraphTwo: 'Building relationships is paramount at Travis Roofing Supply.  We aim to lead the industry in customer engagement by hosting customer events and being active in social mediums.'
    }
  },
  computed: {
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
      return true
    }
  }
}
</script>

<style scoped>
.mission-slug-image {
  width: 100%;
  height: auto;
  max-width: 512px;
}

.padding-sides-zeropx {
  /* Used to remove default side-padding from vuetify elements */
  padding-left: 0px !important;
  padding-right: 0px !important;
}

</style>
