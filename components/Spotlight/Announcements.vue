<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="item in items"
      :key="item.id"
      xs12
      class="pa-1 mb-3"
    >
      <v-card
        :to="getPublicUrl(item)"
        flat
        class="mb-3 text-xs-left pa-0"
      >
        <v-layout
          row
          wrap
          justify-center
          align-center
        >
          <v-flex
            xs12
            sm5
            class="pa-0"
          >
            <v-card-media
              :src="item.photo_cover"
              contain
              height="auto"
              class="card-image"
            />
          </v-flex>
          <v-flex
            xs12
            sm7
          >
            <v-card-title
              primary-title
              class="pb-0 pt-2 primary--text"
            >
              <h2>{{ item.title }}</h2>
            </v-card-title>
            <v-card-title
              v-if="item.summary"
              secondary-title
              class="subheading"
            >
              {{ item.summary }}
            </v-card-title>
            <v-card-title
              secondary-title
              class="caption pb-0 pt-0"
            >
              <p>
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
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    items: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    resolveType (typeUUID) {
      return this.$parent.$parent.$parent.postTypesByUUID[typeUUID].name
    },
    getPublicUrl (item) {
      // return '/spotlight/' + item.slug
      return '/spotlight/' + item.uuid
    },
    formatDate (date) {
      return moment(date, 'YYYY-MM-DD').format('LL')
    },
    openArticle () {
      console.log('program me to do something!!!')
    }
  }
}
</script>

<style media="screen">
  .card-image {
    /* border-radius: 5px; */
  }
</style>
