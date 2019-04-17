<template>
  <v-container
    :class="{'zero-padding-right': isMobile}"
    class="half_padding_top"
    fill-height
  >
    <v-layout
      row
      justify-end
    >
      <v-spacer
        v-if="!getErrorPrompt"
        class="hidden-md-and-up"
      />
      <v-spacer
        v-if="!getErrorPrompt"
        class="hidden-md-and-up"
      />
      <v-spacer
        v-if="!getErrorPrompt"
        class="hidden-md-and-up"
      />
      <v-flex>
        <div class="text-xs-right text-sm-left">
          <v-menu
            offset-y
            auto
            allow-overflow
            content-class="travis_sticky_menu"
            absolute
          >
            <v-btn
              v-if="getErrorPrompt"
              slot="activator"
              round
              outline
              small
              color="error"
              light
            >
              &nbsp;
              <span
                v-if="getCurrentBranch.region === 'Find Store'"
                class="body-2"
                v-text="getCurrentBranch.region"
              />
              <span
                v-else
                class="body-2"
                v-text="getCurrentBranch.region+ ', ' + getCurrentBranch.state"
              />
              &nbsp;
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-btn
              v-else
              slot="activator"
              round
              outline
              small
              color="info"
              light
            >
              &nbsp;
              <span
                v-if="getCurrentBranch.region === 'Find Store'"
                class="body-2"
                v-text="getCurrentBranch.region"
              />
              <span
                v-else
                class="body-2"
                v-text="getCurrentBranch.region+ ', ' + getCurrentBranch.state"
              />
              &nbsp;
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-subheader>
                <strong>Find Nearest:</strong> &nbsp;
                <v-icon
                  v-if="showLocator"
                  class="copper500--text locator_icon"
                  @click="findStore"
                >
                  my_location
                </v-icon>
              </v-subheader>
              <v-divider />
              <v-list-tile
                v-for="branch in getBranches"
                :key="branch.region"
                @click="selectStore(branch)"
              >
                <v-list-tile-title>{{ branch.region + ', ' + branch.state }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-progress-circular
            v-if="searching"
            size="22"
            indeterminate
            color="accent"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StoreFinderButton',
  data: () => ({
    searching: false,
    showLocator: true
  }),
  computed: {
    ...mapGetters([
      'getBranches',
      'getCurrentBranch',
      'getMapBranch',
      'getErrorPrompt'
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
  },
  watch: {
    getErrorPrompt: function () {
      this.checkMenu()
    }
  },
  methods: {
    ...mapActions([
      'closeErrorPrompt',
      'changeMapBranch'
    ]),
    selectStore (branch) {
      this.$store.dispatch('changeCurrentBranch', branch)
      // If mapBranch is unset, this gets it from the StoreFinder button on Overlay Prompt
      if (this.getMapBranch.region === 'Find Store') {
        this.$store.dispatch('changeMapBranch', branch)
      }
      this.$store.dispatch('clearUserError')
      this.closeErrorPrompt()
    },
    findStore () {
      let overridePreferredBranch = true
      this.$store.dispatch('determineClosestBranch', overridePreferredBranch)
      this.searching = true
      this.$store.dispatch('clearUserError')
      setTimeout(function () { this.searching = false }.bind(this), 4000)
    },
    checkMenu () {
      let menu = document.getElementsByClassName('travis_sticky_menu')
      // In case of future use of class, apply to all class members
      if (this.getErrorPrompt) {
        for (let index = 0; index < menu.length; index++) {
          menu[index].style.position = 'absolute'
          menu[index].style.top = '55vh !important'
        }
      } else {
        for (let index = 0; index < menu.length; index++) {
          menu[index].style.position = 'fixed'
          menu[index].style.top = '10vh !important'
        }
      }
    }
  }
}
</script>

<style scoped>
  .locator_icon {
    cursor: pointer;
  }
  .half_padding_top {
    padding-top: 5px !important;
  }
  .progress-circular {
    top: 5px !important;
  }
  .btn.btn--outline{
    /* Border radius transparency issue in Safari
        This makes the Storefinder button rectangular
    */
    border-radius: 0% !important;
  }
  .zero-padding-right {
   padding-right: 0px !important;
  }

</style>

<style>
  /* Unscoped, this causes issues on the overlay prompt. .travis_sticky_menu belongs to body in all cases, so it must be globally scoped. Overcoming this requires setting this with js, or dynamic style binding. I am updating the travis_sticky_menu class via a watcher. See method: checkMenu() */
  .travis_sticky_menu {
    position: fixed !important;
    z-index: 100000 !important;
    top: 10vh !important; /*55vh on overlay prompt*/
  }

</style>
