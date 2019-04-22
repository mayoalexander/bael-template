<template>
  <v-list>
    walkjsdfkj
    <v-toolbar
      id="mobileDrawerHeader"
      flat
      class="accent copper500--text text-xs-center"
    >
      <p class="title text-xs-center">
        Travis
      </p>
    </v-toolbar>
    <v-list-tile
      v-for="item in items"
      :key="item.title"
      @click="routeTo(item.path)"
    >
      <v-list-tile-action>
        <v-icon
          class="copper500--text"
          dark
        >
          {{ item.icon }}
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'MobileDrawer',
  data () {
    return {
      items: [
        { title: 'Home', icon: 'home', path: '/' },
        { title: 'Branches', icon: 'location_on', path: '/branches' },
        { title: 'Jobs', icon: 'work', path: '/jobs' },
        { title: 'Spotlight', icon: 'star', path: '/spotlight' },
        { title: 'Scholarship', icon: 'school', path: '/scholarship' }
      ]
    }
  },
  methods: {
    routeTo (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<style scoped>

  #mobileDrawerHeader {
    border-bottom: 1px solid #b87333 !important;
  }

  .toolbar__content p {
    margin: auto !important;
  }

</style>
