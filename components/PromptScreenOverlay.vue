<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="getErrorPrompt"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            xs12
            class="text-xs-center"
          >
            <v-progress-circular
              :size="120"
              :width="1"
              indeterminate
              color="copper700"
            >
              <v-icon
                medium
                color="copper700"
              >
                store
              </v-icon>
            </v-progress-circular>
          </v-flex>
          <v-flex
            xs12
            class="text-xs-center"
          >
            <p class="display-1 copper700--text">
              Please Select A Store
            </p>
          </v-flex>
          <v-flex xs12>
            <notify-error-message />
          </v-flex>
          <v-flex
            xs7
            sm12
            offset-sm4
          >
            <store-finder-button />
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NotifyErrorMessage from '@/components/NotifyErrorMessage.vue'
import StoreFinderButton from '@/components/StoreFinderButton.vue'

export default {
  name: 'PromptScreenOverlay',
  components: {
    NotifyErrorMessage,
    StoreFinderButton
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getCurrentBranch',
      'getErrorPrompt'
    ])
  },
  methods: {
    ...mapActions([
      'clearUserError'
    ])
  }
}
</script>

<style scoped>
  .center-notice-storefinder {
    position: absolute;
    margin: auto;
    height: 50%;
    width: 50%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5000;
  }
  .custom-travis-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:rgba(0, 0, 0, 0.5);
  }

</style>
