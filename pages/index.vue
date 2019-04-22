<template>
  <div>
    <spotlight-slider
      v-if="currentBranchContent"
      :items="currentBranchContent"
      class="mb-0"
    />

    <!-- <v-layout row>
      <travis-hero />
      <travis-hero-card />
    </v-layout> -->
    <!-- <v-layout
      row
      class="about-travis"
      justify-center
    >
      <about-travis />
    </v-layout> -->

    <v-layout
      row
      class="constrain-content mt-5"
      justify-space-around
    >
      <mission-statement />
    </v-layout>
    <v-layout
      row
      wrap
      class="constrain-content mt-5"
      justify-space-around
    >
      <delivery-notifications-slug />
    </v-layout>
    <v-layout
      row
      wrap
      justify-space-around
      class="constrain-content my-5"
    >
      <mobile-slug />
    </v-layout>
    <v-container>
      <v-layout
        row
        wrap
        align-center
        justify-center
      >
        <v-flex
          lg10
        >
          <h4 class="display-4 text-xs-center mb-5">
            News
          </h4>

          <spotlight-news
            v-if="currentBranchContent"
            :items="currentBranchContent"
            class="mb-5"
          />

          <div class="text-xs-center">
            <v-btn
              :to="'/spotlight'"
              color="primary"
            >
              View More
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
// import request from '@/request.js'
// import TravisHero from '@/components/TravisHero.vue'
// import TravisHeroCard from '@/components/TravisHeroCard.vue'
import DeliveryNotificationsSlug from '@/components/DeliveryNotificationsSlug.vue'
import SpotlightNews from '@/components/Spotlight/News.vue'
import MobileSlug from '@/components/MobileSlug.vue'
import MissionStatement from '@/components/MissionStatement.vue'
// import AboutTravis from '@/components/AboutTravis.vue'
import SpotlightSlider from '@/components/Spotlight/Slider.vue'

export default {
  name: 'Home',
  components: {
    SpotlightSlider,
    DeliveryNotificationsSlug,
    MobileSlug,
    MissionStatement,
    SpotlightNews
  },
  data () {
    return {
      posts: [],
      postStatuses: []
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentBranch'
    ]),
    currentBranchContent () {
      if (process.client) {
        return (this.getCurrentBranch.slug
          ? this.filterByCurrentBranch(this.posts)
          : this.posts)
      }
    }
  },
  mounted: function () {
    this.getContent()
  },
  methods: {
    async getContent () {
      var posts = await this.$parent.$parent.getContent()
      this.posts = posts
      return posts
    },

    filterByCurrentBranch (allPosts) {
      var posts = []
      allPosts.forEach((post) => {
        // branch specific post
        if (post.branches) {
          post.branches.forEach((branch) => {
            if (branch === this.getCurrentBranch.slug) {
              posts.push(post)
            }
          })
        } else {
          // global post, branch is null
          posts.push(post)
        }
      })
      return posts
    }
  }
}
</script>

<style scoped>

  .about-travis {
    padding-top: 40px;
  }

</style>
