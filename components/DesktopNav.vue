<template>
  <v-flex
    xs12
    class="text-xs-right"
  >
    <ul>
      <li
        class="subheading"
        @click="route('/')"
      >
        Home
      </li>
      <li
        class="subheading"
        @click="route('/spotlight')"
      >
        Spotlight
      </li>
      <li
        class="subheading"
        @click="route('/branches')"
      >
        Branches
      </li>
      <li
        class="subheading"
        @click="route('/jobs')"
      >
        Jobs
      </li>
      <li
        class="subheading"
      >
        <v-menu>
          <v-badge
            slot="activator"
            right
          >
            <span
              v-if="hasNewAlerts"
              slot="badge"
            >
              {{ announcements.length }}
            </span>
            <v-icon
              large
              color="grey lighten-1"
            >
              notification_important
            </v-icon>
          </v-badge>
          <!-- <v-btn
            flat
            slot="activator">
            <v-icon>
              notification_important
            </v-icon>
          </v-btn> -->
          <v-list>
            <v-subheader>Branch Announcements</v-subheader>
            <v-list-tile
              v-for="item in announcements"
              :key="item.id"
              :to="'/spotlight/' + item.id"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-if="!announcements.length"
            >
              <v-list-tile-title small>
                There are no announcements at this time.
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </li>
    </ul>
  </v-flex>
</template>

<script>
import cookies from 'js-cookie'

export default {
  name: 'DesktopNav',
  props: {
    announcements: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  computed: {
    hasNewAlerts () {
      if (this.announcements.length > 0) {
        var latestAnnouncement = this.announcements.slice(-1).pop()
        if (cookies.getJSON('latest_snackbar_alert') === latestAnnouncement.uuid) {
          return false
        } else {
          cookies.set('latest_snackbar_alert', latestAnnouncement.uuid)
          return true
        }
      } else {
        // console.log('no new alerts exist')
        return false
      }
    }
  },
  methods: {
    route (path) {
      this.$router.push({
        path: path
      })
    },
    routeHome () {
      this.$router.push({
        path: '/'
      })
    },
    routeResources () {
      this.$router.push({
        path: '/resources'
      })
    },
    routeBranches () {
      this.$router.push({
        path: '/branches'
      })
    },
    routeJobs () {
      this.$router.push({
        path: '/jobs'
      })
    },
    routeCredit () {
      this.$router.push({
        path: '/credit'
      })
    },
    checkIfHasNeverSeenBefore (announcement) {
      var result = true
      if (cookies.getJSON('latest_snackbar_alert')) {
        if (announcement.id === cookies.getJSON('latest_snackbar_alert')) {
          result = false
        }
      }
      return result
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-top: 16px;
  white-space: nowrap;
}

ul li {
  display: inline-block;
  padding-left: 15px;
  padding-right: 15px;
}

ul li:hover {
  color: #b87333;
  cursor: pointer;
}
</style>
