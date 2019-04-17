<template>
  <div class="news-block">
    <v-layout justify-center>
      <v-flex xs12>
        <v-container
          fluid
          grid-list-md
          class="pa-2"
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(item, key, index) in filteredContent"
              :key="index"
              v-bind="{ [`xs${item.flex}`]: true }"
            >
              <v-card
                :to="linkToItem(item)"
              >
                <v-img
                  :src="getImage(item)"
                  :gradient="getGradient(item, index)"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout
                      fill-height
                    >
                      <v-flex
                        xs12
                        align-end
                        flexbox
                      >
                        <div class="headline white--text font-weight-bold">
                          {{ item.title }}
                        </div>
                        <div class="white--text">
                          By {{ item.author }}
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions v-if="item.flex < 0">
                  <v-card-title>
                    {{ item.title }}
                  </v-card-title>
                  <v-spacer />
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// import request from '@/request.js'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    // items: []
  }),
  computed: {
    filteredContent: function () {
      var results = []
      this.items.forEach(function (item) {
        // if (item.type === 'news' || item.type === 'blog') {
        results.push(item)
        // }
      })
      return results
    }
  },
  mounted: function () {
    // this.getNews()
  },
  methods: {
    linkToItem (item) {
      return '/spotlight/' + item.slug
    },
    getGradient (item, index) {
      return 'to right, rgba(0,0,0,.20), rgba(0,0,0,.5)'
    },
    getImage (item) {
      if (item.photo_cover) {
        return item.photo_cover
      } else {
        return 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
      }
    }
  }
}
</script>
