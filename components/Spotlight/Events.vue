<template>
  <v-container
    fluid
    class="pa-0"
  >
    <loading-spinner
      v-show="!isLoaded"
    />

    <div
      v-if="isLoaded"
      class="content-area"
    >
      <v-carousel
        style="height: 100%"
        hide-controls
        hide-delimiters
      >
        <v-carousel-item
          key="i"
          :src="item.photo_cover"
          :gradient="getGradient()"
        >
          <v-container fill-height>
            <v-layout
              align-center
              class="px-3"
            >
              <v-flex
                class="text-xs-center white--text"
              >
                <h3 class="display-3 mb-4 white--text font-weight-bold">
                  {{ item.title }}
                </h3>
                <h4 class="subheading">
                  {{ item.summary }}
                </h4>
                <p class="mt-3">
                  <span v-if="item.author">
                    by {{ item.author }}
                  </span>
                  <span v-if="item.author && item.date_publish">
                    |
                  </span>
                  <span v-if="item.date_publish">
                    {{ formatDate(item.date_publish) }}
                  </span>
                  <span
                    v-if="item.type"
                    class="text-capitalize"
                  >
                    | {{ resolveType(item.type) }}
                  </span>
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-carousel-item>
      </v-carousel>

      <v-layout
        align-center
        column
        justify-center
      >
        <div class="mb-5">
          <label
            v-for="category in item.categories"
            :key="category.id"
          >
            <v-chip>{{ category.title }}</v-chip>
          </label>
        </div>
      </v-layout>

      <v-layout
        row
        wrap
        align-center
        justify-center
        class="mb-4 pa-3"
      >
        <v-flex
          md8
        >
          <v-container
            class="pt-0"
          >
            <v-layout
              align-center
              row
              justify-start
              fill-height
            >
              <v-flex
                class="px-0"
              >
                <div class="nice-copy">
                  <!-- prettier-ignore -->
                  <p v-html="parseBody(item.body)" />
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="enableRelatedPosts"
        row
        wrap
        justify-center
        justify-start
      >
        <v-flex
          sm8
          xs10
        >
          <v-layout
            align-start
            justify-start
            row
            wrap
            class="text-xs-center pa-2"
          >
            <v-flex
              lg8
            >
              <h4 class="display-1 font-weight-black mb-3 copper500--text">
                Related News
              </h4>
              <spotlight-announcements
                :items="items"
                class="mb-5"
              />
            </v-flex>
            <v-flex
              lg4
            >
              <h4 class="display-1 font-weight-black mb-3 copper500--text">
                Events
              </h4>
              <spotlight-events
                :items="items"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>

import YouTubePlayer from 'youtube-player'
import moment from 'moment'
import SpotlightAnnouncements from '@/components/Spotlight/Announcements.vue'
import SpotlightEvents from '@/components/Spotlight/Events.vue'
import request from '@/request'

export default {
  components: {
    SpotlightAnnouncements,
    SpotlightEvents
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      player: false,
      videoMediaID: [],
      isLoaded: false,
      isPlaying: false,
      item: false,
      enableRelatedPosts: false,
      items: []
    }
  },
  computed: {
    isElementInView () {
      return this.isPlaying
    }
  },
  created () {
    this.getPosts(this.id)
    document.body.addEventListener('scroll', this.handleScroll())

    setTimeout(() => {
      this.initVideoPlayer()
    }, 2000)

    console.log('scrolling Injected')
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.isPlaying = this.isElementInViewport()
      if (this.player) {
        if (this.isElementInViewport()) {
          this.player.playVideo()
        } else {
          this.player.stopVideo()
        }
      }
    },
    initVideoPlayer () {
      if (document.getElementById('video-scroll')) {
        let player
        player = YouTubePlayer('video-scroll', {
          videoId: this.videoMediaID,
          width: '100%',
          playerVars: {
            mute: true
          }
        })
        player.on('ready', () => {
          if (this.isElementInViewport()) {
            player.playVideo()
          }
          this.player = player
        })
      }
    },
    formatDate (date) {
      return moment(date, 'YYYY-MM-DD').format('LL')
    },
    getGradient (item) {
      return 'to right, rgba(0,0,0,.20), rgba(0,0,0,.5)'
    },
    async getPosts (postSlug) {
      var post = await request.getPostBySlug(postSlug)
      this.item = post
      var posts = await request.getAllPosts()
      this.items = posts
      this.isLoaded = true
    },
    isElementInViewport () {
      var el = document.querySelector('.video-scroll')
      if (el) {
        var rect = el.getBoundingClientRect()
        return rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                rect.bottom < (window.innerHeight || document.documentElement.clientHeight)
      }
    },
    resolveType (typeUUID) {
      return this.$parent.$parent.postTypesByUUID[typeUUID].name
    },
    parseBody (body) {
      body = this.convertYouTubeLinksToIframes(body)
      return body
    },
    convertYouTubeLinksToIframes (text) {
      return (text || '').replace(
        // prettier-ignore
        /*eslint-disable*/
        /(https:\/\/www.youtube.com\/watch\?v=)\w+/giu,
        (match, space, url) => {
          var mediaID = match.replace(space, '')
          this.videoMediaID = mediaID
          return '<div id="video-scroll" src="' + match + '" frameborder=0 class="video-scroll video-embed">' + match + '</div>'
        }
        /* eslint-enable */
      )
    }
  }
}
</script>

<style media="screen">
  .video-embed {
    width:100%;
    min-height:250px;
    height:20vh;
    border-radius:4px;
  }
</style>
