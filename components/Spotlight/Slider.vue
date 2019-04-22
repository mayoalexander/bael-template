<template>
  <div class="">
    <v-carousel
      :hide-controls="!isMoreThanOne"
      :hide-delimiters="!isMoreThanOne"
      style="height: 100%"
    >
      <v-carousel-item
        v-for="(slide, i) in filteredContent"
        :key="i"
        :src="slide.photo_cover"
        :gradient="getGradient(slide)"
      >
        <v-container fill-height>
          <v-layout
            align-center
            class="px-3"
          >
            <v-flex
              class="text-xs-center"
            >
              <h3 class="display-3 mb-4 white--text font-weight-bold">
                {{ slide.title }}
              </h3>
              <v-btn
                :to="'/spotlight/' + slide.uuid"
                dark
                class="travisBrand"
              >
                View More
              </v-btn>
              <span class="subheading">
                {{ slide.text }}
              </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // items: []
    }
  },
  computed: {
    isMoreThanOne () {
      return (this.items.length > 1)
    },
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
  created: function () {

  },
  methods: {
    getGradient (item) {
      return 'to right, rgba(0,0,0,.20), rgba(0,0,0,.5)'
    }
  }
}
</script>

<style lang="stylus">
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
