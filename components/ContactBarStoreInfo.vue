<template>
  <div class="text-xs-right info--text subheading cbar-component-container">
    <v-container
      fill-height
      mt-0
      fluid
      class="half_padding_top"
    >
      <v-layout>
        <v-flex
          id="store-phone"
          class="store-info"
        >
          <span
            v-if="getCurrentBranch.slug"
            class="body-1"
          >
            <a
              :href="'tel:' + getCurrentBranch.phone_number"
              class="accent--text"
            >
              <i class="fas fa-phone fa-rotate-90" />&nbsp;&nbsp;
              <span v-text="getCurrentBranch.phone_number" />
            </a>
          </span>
        </v-flex>
        <v-flex
          id="store-email"
          class="store-info"
        >
          <span
            v-if="getCurrentBranch.slug"
            class="body-1"
          >
            <a
              :href="'mailto:' + getCurrentBranch.email"
              class="accent--text"
            >
              <i class="fas fa-envelope" />&nbsp;&nbsp;
              <span v-text="getCurrentBranch.email" />
            </a>
          </span>
        </v-flex>
        <v-flex
          id="store-address"
          class="store-info"
        >
          <span
            v-if="getCurrentBranch.slug"
            class="body-1"
          >
            <a
              :href="'https://maps.apple.com/?q=' +getCurrentBranch.name+ '&ll=' + getCurrentBranch.coordinates[0] + ',' + getCurrentBranch.coordinates[1]"
              class="accent--text"
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
import { mapGetters } from 'vuex'

export default {
  name: 'ContactBarStoreInfo',
  computed: {
    ...mapGetters([
      'getCurrentBranch'
    ])
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

  .cbar-component-container {
    height: 48px;
  }

  .half_padding_top {
    padding-top: 12px !important;
  }

</style>
