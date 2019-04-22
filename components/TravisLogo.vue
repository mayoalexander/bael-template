<template>
  <img
    :src="travisLogo"
    alt="Travis Logo"
    class="travis-logo-svg"
    @click="$router.push({path: '/'})"
  >
</template>

<script>
import branding from '@/assets/brandai.json'

const TravisWolfBadge = branding.lookup.logos.travisWolfCopperBadge.url
const TravisCombo = branding.lookup.logos.travisStackedWithWolf.url

export default {

  name: 'TravisLogo',

  computed: {
    travisLogo () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return TravisWolfBadge // TravisStackedLogo (changed for better layout)
        case 'sm':
          return TravisWolfBadge
        case 'md':
          return TravisCombo
        case 'lg':
          return TravisCombo
        case 'xl':
          return TravisCombo
      }
      return false
    }
  }
}
</script>

<style scoped>
.travis-logo-svg {
  /* max-height = 128px (toolbar height) - (8px: banner bar content top padding) - (1px: banner bar bottom border(copper pixel)) - (5px: a little extra padding)*/
  max-height: 114px;
  max-width: 380px;
}
@media only screen and (max-width: 370px) {
  .travis-logo-svg {
    max-height: 80px;
  }
}
img {
  cursor: pointer;
}
</style>
