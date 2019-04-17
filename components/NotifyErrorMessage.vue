<template>
  <ul
    v-if="getErrorNotice.length > 0"
    class="text-xs-center"
  >
    <li
      v-for="(error, index) in getErrorNotice"
      :key="index"
      class="subheading error--text"
    >
      {{ error }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getErrorNotice'
    ])
  },
  mounted () {

  }
}
</script>

<style scoped>
  .closeErr {
    cursor: pointer;
  }
  li {
    list-style: none;
  }
</style>
