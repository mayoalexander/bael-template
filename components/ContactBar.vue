<template>
  <v-toolbar
    xs12
    class="copper500 contact-bar-zIndex"
    flat
    dense
  >
    <v-layout
      row
      justify-space-between
      class="contact-bar-content"
    >
      <v-flex
        xs1
        sm1
        class="hidden-md-and-up"
      >
        <v-toolbar-side-icon
          class="copper500 accent--text"
          @click="toggleMobileDrawer"
        />
      </v-flex>

      <v-flex
        xs9
        sm3
        md3
      >
        <store-finder-button />
      </v-flex>

      <v-flex
        md9
        class="hidden-sm-and-down"
      >
        <contact-bar-store-info />
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import ContactBarStoreInfo from '@/components/ContactBarStoreInfo.vue'
import StoreFinderButton from '@/components/StoreFinderButton.vue'

export default {

  name: 'ContactBar',
  components: {
    ContactBarStoreInfo,
    StoreFinderButton
  },
  data () {
    return {
      msg: 'Contact Bar'
    }
  },
  methods: {
    toggleMobileDrawer: function () {
      this.$parent.$emit('toggleMobileNav')
    }
  }

}
</script>

<style scoped>

  .contact-bar-content {
    width: 100%;
    height: 48px;
    max-width: 1440px;
    margin: auto !important;
  }

  .contact-bar-zIndex {
    z-index: 5; /*Ensures bannerbar does not hide contact bar on 'scroll-off-screen' */
  }
</style>
