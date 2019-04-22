<template>
  <v-flex
    xs10
    class="text-xs-center"
  >
    <v-divider class="copper500" />
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
        >
          <img
            :src="slugIMG"
            class="mission-slug-image"
            alt="picture of phones with our app"
          >
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-layout
            :class="{'mt-4': !isMobile}"
            row
            wrap
          >
            <v-flex
              xs12
              class="text-xs-center"
            >
              <div
                :class="{'headline': isMobile, 'display-1': !isMobile}"
                class="text-xs-center"
              >
                {{ slugTitle }}
              </div>
              <br><br>
              <p class="copper500--text subheading">
                {{ paragraphOne }}
              </p>
              <p class="copper500--text subheading">
                {{ paragraphTwo }}
              </p>
              <p class="copper500--text subheading">
                {{ paragraphThree }}
              </p>
            </v-flex>
          </v-layout>
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
      slugIMG: brandImages.travisArmadaCustomerNotifications512X512Png.url,
      slugTitle: 'Introducing Travis Armada',
      paragraphOne: 'With Travis Armada, we take the unknown part of your day and make it predictable!  As soon as you order from us, you\'ll get notifications confirming the list of materials ordered, and an estimated delivery time.',
      paragraphTwo: 'With Travis, you don\'t have to guess when your materials will be on site.  We\'ll send you a link to track our delivery truck in real-time on the map!  You\'ll receive notifications when we leave our warehouse, and again when we\'re close to the drop off.',
      paragraphThree: 'That\'s not all!  We\'ll notify you as soon as we arrive, and again when we finish unloading our truck.  You\'ll even get pictures of your materials at your site, so you can keep focusing on your business without worrying about the details!'
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
      return false
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
p {
  text-align: left !important;
}

.padding-sides-zeropx {
  /* Used to remove default side-padding from vuetify elements */
  padding-left: 0px !important;
  padding-right: 0px !important;
}

</style>
