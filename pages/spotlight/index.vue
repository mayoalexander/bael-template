<template>
  <div class="">
    <v-container
      v-if="currentBranchContent"
      fluid
      class=""
    >
      <v-container
        grid-list-md
        text-xs-left
        class="pa-1"
      >
        <v-layout
          row
          wrap
          align-center
          justify-center
        >
          <v-flex
            xs12
            md8
          >
            <h4 class="display-1 font-weight-black mb-3 copper500--text">
              News
            </h4>
            <spotlight-announcements
              :items="currentBranchContent"
              class="mb-5"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <v-container
      v-else
      fill-height
    >
      <loading-spinner />
    </v-container>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import SpotlightAnnouncements from '@/components/Spotlight/Announcements.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
// import SpotlightEvents from '@/components/Spotlight/Events.vue'
// import request from '@/request.js'

export default {
  components: {
    SpotlightAnnouncements,
    LoadingSpinner
    // SpotlightEvents
  },
  data () {
    return {
      posts: []
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentBranch'
    ]),
    currentBranchContent () {
      return (this.getCurrentBranch.slug
        ? this.filterByCurrentBranch(this.posts)
        : false)
    }
  },
  mounted: function () {
    this.getContent()
    console.log({
      laksdfj: this.getCurrentBranch
    })
  },
  methods: {
    async getContent () {
      this.posts = await this.$parent.$parent.getContent()
      return this.posts
    },
    filterByCurrentBranch (allPosts) {
      var posts = []
      allPosts.forEach((post) => {
        if (post.branches) {
          post.branches.forEach((branch) => {
            if (branch === this.getCurrentBranch.slug) {
              console.log('okay we good', post)
              posts.push(post)
            }
          })
        } else {
          posts.push(post)
        }
      })
      console.log({
        thisManyPostLeft: posts
      })
      return posts
    }
  }
}
</script>

<style scoped lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
