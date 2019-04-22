<template>
  <v-app
    light
    class="accent"
    @toggleMobileNav="toggleDrawer"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      temporary
      light
      class="accent"
    >
      <!-- <mobile-drawer /> -->
    </v-navigation-drawer>
    <v-container
      id="headerContainer"
      ref="headerContainer"
      fluid
      ml-0
      mr-0
      pl-0
      pr-0
      pt-0
      pb-0
      mt-0
    >
      <v-layout>
        <v-flex xs12>
          <!-- <contact-bar /> -->
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <!-- <banner-bar /> -->
        </v-flex>
      </v-layout>
    </v-container>
    <v-container
      id="travis-content-container"
      :style="{ marginTop: headerHeight + 'px', marginBottom: footerHeight + 131 + 'px' }"
      fluid
    >
      <!-- <prompt-screen-overlay /> -->
      <router-view />
    </v-container>
    <v-container
      id="footerContainer"
      ref="footerContainer"
      fluid
      ml-0
      mr-0
      pl-0
      pr-0
      pt-0
      pb-0
      mt-0
    >
      <!-- <footer-content /> -->
    </v-container>
  </v-app>
</template>

<script>
import request from '@/request.js'
// import ContactBar from '@/components/ContactBar.vue'
// import FooterContent from '@/components/FooterContent.vue'
// import BannerBar from '@/components/BannerBar.vue'
// import MobileDrawer from '@/components/MobileDrawer.vue'
// // import MobileLogo from '@/components/MobileLogo.vue'
// import PromptScreenOverlay from '@/components/PromptScreenOverlay.vue'
import axios from 'axios'
export default {

  name: 'App',
  components: {
    // ContactBar,
    // FooterContent,
    // BannerBar,
    // MobileDrawer,
    // MobileLogo,
    // PromptScreenOverlay
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@ALEXANDER' },
        { name: 'twitter:title', content: 'ALEXANDER' },
        {
          name: 'twitter:description',
          content:
            'Nuxt.js lets you handle custom headers for your app with vue-meta'
        },
        {
          name: 'twitter:image',
          content: 'https://avatars0.githubusercontent.com/u/23360933?v=3'
        },
        { name: 'twitter:image:alt', content: 'Nuxt.js logo' }
      ]
    }
  },
  data () {
    return {
      title: 'Travis Web App',
      drawer: false,
      postTypesByUUID: false,
      postStatuses: false,
      headerHeight: 0,
      footerHeight: 0
    }
  },
  computed: {
    siteTitle () {
      return 'This is the inspire page'
    }
  },
  async asyncData ({ params }) {
    // We can use async/await ES6 feature
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/100`)
    return { post: data }
  },
  mounted () {
    this.getPostStatuses()
    this.getContent()

    this.headHeight()

    this.footHeight()

    this.$nextTick(function () {
      window.addEventListener('resize', this.headHeight)
      window.addEventListener('resize', this.footHeight)
      this.headHeight()
      this.footHeight()
    })

    this.getPostTypes()
    this.findHorizontalOffenders()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.headHeight)
    window.removeEventListener('resize', this.footHeight)
  },

  methods: {
    async getPostTypes () {
      var result = []
      await request.getPostTypes().then((res) => {
        res.forEach((type) => {
          result[type.uuid] = type
        })
        this.postTypesByUUID = result
      })
    },
    async getPostStatuses () {
      var result = await request.getPostStatuses()
      this.postStatuses = result
      return result
    },
    async getContent () {
      var result = []
      var allPosts = await request.getNews()
      if (allPosts) {
        allPosts.forEach((item) => {
          var status = this.getStatusByUUID(item.status)
          if (status.name === 'public') {
            result.push(item)
          }
        })
      }
      this.posts = result
      return result
    },
    getStatusByUUID (statusId) {
      var result = false
      if (this.postStatuses) {
        this.postStatuses.forEach((item) => {
          if (item.uuid === statusId) {
            result = item
          }
        })
      }
      return result
    },
    headHeight () {
      // this.headerHeight = this.$refs.headerContainer.clientHeight
    },
    footHeight () {
      // this.footerHeight = this.$refs.footerContainer.firstChild.clientHeight
    },
    toggleDrawer: function () {
      this.drawer = !this.drawer
    },
    findHorizontalOffenders: function () {
      // This function finds and logs any elements which exceed the document object width
      let docWidth = document.documentElement.offsetWidth

      Array.prototype.forEach.call(
        document.querySelectorAll('*'),
        function (el) {
          if (el.offsetWidth > docWidth) {
            console.log('The following element causes horizontal overflow: ')
            console.log(el)
          }
        }
      )
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,700,800,900|Lora:300,400,500,700');

  .application {
    font-family: "Raleway", sans-serif !important; /*Overidden on remote*/
    /* font-family: "Lora", serif !important; */
    /* font-family: "Roboto", monospace; */
  }

  .body-2, .title {
    font-weight: 700 !important; /*Raleway bold: 700.  Roboto bold: 500 (default)*/
  }

  #headerContainer {
    position: fixed;
    z-index: 1;
  }

  #travis-content-container {
    width: 100% !important;
    padding-top:0px !important;
    /* Remove Vuetify global 16px padding from v-container wrapping all router views */
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  #footerContainer {
   width: 100% !important;
  }

</style>
