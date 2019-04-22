<template>
  <ul ref="footerNavLinks">
    <li
      v-for="link in links"
      :key="link.title"
      @click="routeToPath(link.path)"
    >
      {{ link.title }}&nbsp;&nbsp;|&nbsp;
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FooterNavLinks',
  data () {
    return {
      msg: 'Hey from footer-nav-links !!',
      links: [
        // {title: 'Support', path: '/support' },
        { title: 'Scholarship', path: '/scholarship' },
        { title: 'Credit', path: '/credit' },
        { title: 'Privacy', path: '/privacy' }
      ]
    }
  },
  mounted () {
    this.scrubLastSplitter()
  },
  methods: {
    routeToPath (destination) {
      this.$router.push({
        path: destination
      })
    },
    scrubLastSplitter () {
      this.$refs.footerNavLinks.lastChild.innerHTML = this.$refs.footerNavLinks.lastChild.innerHTML.replace('|', '')
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    white-space: nowrap;
  }
  li {
    cursor: pointer;
    display: inline;
  }
  li:hover {
    color: #cd9d70;
  }
</style>
