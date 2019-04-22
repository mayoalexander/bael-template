<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        ref="mapContainer"
        xs12
        md6
      >
        <gmap-map
          ref="realGMAP"
          :center="center"
          :zoom="zoom"
          :style="{ width: mapWidth + 'px', height: mapHeight + 'px' }"
          @resize="mapHeight = mapContainerHeight()"
        >
          <gmap-marker
            v-for="(branch,index) in getBranches"
            :key="index"
            :icon="{url: branchMapMarkerIcon}"
            :position="{lat: branch.coordinates[0], lng: branch.coordinates[1]}"
            :clickable="true"
            :draggable="false"
            @click="updateMap(branch)"
          />
        </gmap-map>
      </v-flex>
      <v-flex
        xs12
        md6
        class="text-xs-center"
      >
        <v-list
          v-if="getMapBranch.slug"
          id="profileCardTitle"
          dense
        >
          <v-list-tile>
            <v-list-tile-action>
              <span
                class="cursor-my-pointer"
                @click="favorBranch"
              >
                <v-icon
                  v-if="starOn"
                  :color="starColor"
                  large
                >
                  star
                </v-icon>
                <v-icon
                  v-else
                  :color="starColor"
                  large
                >
                  star_border
                </v-icon>
              </span>
            </v-list-tile-action>
            <span class="title">
              {{ getMapBranch.name }}
            </span>
          </v-list-tile>
          <br>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon
                small
                color="copper500"
              >
                store
              </v-icon>
            </v-list-tile-action>
            <span class="subheading">
              <v-layout
                row
                wrap
                justify-start
                align-content-start
              >
                <v-flex
                  xs12
                  text-xs-left
                >
                  {{ getMapBranch.street }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
                justify-start
                align-content-start
              >
                <v-flex
                  xs12
                  text-xs-left
                >
                  {{ getMapBranch.city }}, {{ getMapBranch.state }}&nbsp;{{ getMapBranch.zip_code }}
                </v-flex>
              </v-layout>
            </span>
          </v-list-tile>
        </v-list>
        <br>
        <br>
        <v-layout
          row
          wrap
        >
          <v-flex
            id="profileCardLeft"
            xs12
            sm6
          >
            <v-list v-if="getMapBranch.slug">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon
                    small
                    color="copper500"
                  >
                    phone
                  </v-icon>
                </v-list-tile-action>
                <span class="subheading">
                  {{ getMapBranch.phone_number }}
                </span>
              </v-list-tile>
              <v-list-tile v-if="getMapBranch.fax_number">
                <v-list-tile-action>
                  <v-icon
                    small
                    color="copper500"
                  >
                    print
                  </v-icon>
                </v-list-tile-action>
                <span class="subheading">
                  {{ getMapBranch.fax_number }}
                </span>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon
                    small
                    color="copper500"
                  >
                    people_outline
                  </v-icon>
                </v-list-tile-action>
                <span class="subheading">
                  <a
                    :href="getMapBranch.support_link"
                    target="_blank"
                  >
                    Customer Support
                  </a>
                </span>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex
            id="profileCardRight"
            xs12
            sm6
          >
            <v-list v-if="getMapBranch.slug">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon
                    small
                    color="copper500"
                  >
                    email
                  </v-icon>
                </v-list-tile-action>
                <span class="subheading">
                  {{ getMapBranch.email }}
                </span>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon
                    small
                    color="copper500"
                  >
                    credit_card
                  </v-icon>
                </v-list-tile-action>
                <span class="subheading">
                  {{ getMapBranch.email_AR }}
                </span>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon
                    small
                    color="copper500"
                  >
                    attach_money
                  </v-icon>
                </v-list-tile-action>
                <span class="subheading">
                  {{ getMapBranch.email_AP }}
                </span>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import branding from '@/assets/brandai.json'
const brandImages = branding.lookup.images

// import Vue from 'vue'
// import * as VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: process.env.GOOGLE_MAP_API_KEY
//   }
// })

export default {
  name: 'BranchMap',
  data () {
    return {
      center: {
        lat: 39.833333,
        lng: -98.583333
      }, // centers on kansas
      zoom: 4, // Zooms out to North America
      mapHeight: 0,
      starOn: false, // boolean for star icon
      starColor: 'copper500',
      panColor: 'copper500'
    }
  },
  computed: { // Map Aspect Ratio is 5:3
    mapWidth: {
      get: function () {
        return this.mapContainerWidth
      }
    },
    branchMapMarkerIcon () {
      return brandImages.travisBranchMapMarkerSvg.url
    },
    ...mapGetters([
      'getMapBranch',
      'getBranches',
      'getCurrentBranch',
      'getPreferredBranch'
    ])
  },
  watch: {
    getMapBranch: function () {
      if (this.getMapBranch.slug) {
        this.center = {
          lat: this.getMapBranch.coordinates[0],
          lng: this.getMapBranch.coordinates[1]
        }
        this.zoom = 10

        // check if preferred
        console.log('Checking if new mapBranch is preferred. Updating star.')
        this.isPreferred()
      }
    },
    getPreferredBranch: function () {
      console.log('Watcher detected preferred branch. Setting star.')
      this.isPreferred()
    }
  },
  mounted () {
    // GMap resize
    this.mapHeight = this.mapContainerHeight()

    // Fire mapBranchInit, mapped from Vuex store
    this.mapBranchInit()

    // Update star color if loading directly to branch with preferred
    this.isPreferred()
  },
  methods: {
    ...mapActions([
      'changeMapBranch',
      'mapBranchInit',
      'setPreferredBranch'
    ]),
    favorBranch () {
      /* If untoggle star needs to delete cookie, run conditional here.
         For now, preferredBranch cookie can only be over-written by
         starring a different branch
      */

      // Set preferred branch (current mapBranch)
      this.setPreferredBranch(this.getMapBranch)

      // update color of star icon
      if (this.starColor === 'copper500') {
        this.starColor = 'warning'
      } else {
        this.starColor = 'copper500'
      }

      // change star_border icon to star icon
      if (this.starOn) {
        this.starOn = false
      } else {
        this.starOn = true
      }
    },
    updateMap (branch) {
      if (branch.region !== this.getMapBranch.region) {
        this.changeMapBranch(branch)
        if (this.panColor === 'error') {
          this.panColor = 'copper500'
        }
      } else {
        // Zoom is auto set to 10 on new branch selection. only run progZoom if no branch change
        this.progressiveZoom()
      }
    },
    progressiveZoom () {
      console.log('Progressive Zoom Fired')
      console.log('Changing zoom from ' + this.zoom)
      if (this.zoom < 10) {
        this.zoom = 10
      } else if (this.zoom < 16 && this.zoom >= 10) {
        this.zoom = 16
      } else if (this.zoom === 16) {
        this.zoom = 4
      } else {
        this.zoom = 10
      }
      console.log('to ' + this.zoom)
    },
    reCenterOnBranch () {
      this.$refs.realGMAP.panTo(this.center)
      if (this.panColor === 'copper500') {
        this.panColor = 'error'
      }
    },
    mapContainerWidth () {
      return this.$refs.mapContainer.clientWidth
    },
    mapContainerHeight () {
      let h = this.$refs.mapContainer.clientWidth
      h = h * (3 / 5)
      // console.log('Calculated map height: ' + h)
      return h
    },
    isPreferred () {
      console.log('star check. mapBranch: ' + this.getMapBranch.slug)
      console.log('star check. preferredBranch: ' + this.getPreferredBranch.slug)
      if ((this.getMapBranch.slug === this.getPreferredBranch.slug) && (typeof this.getPreferredBranch.slug !== 'undefined')) {
        this.starOn = true
        this.starColor = 'warning'
      } else {
        this.starOn = false
        this.starColor = 'copper500'
      }
    }
  }
}
</script>

<style scoped>
  .cursor-my-pointer{
    cursor: pointer;
  }
</style>
