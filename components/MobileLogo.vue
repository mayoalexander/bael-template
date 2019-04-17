<template>
  <v-layout
    row
    class="text-xs-center accent--text"
  >
    <v-flex xs12>
      <br><br>
      <img :src="travisWolfInverse">
      <br><br>
      <p class="caption">
        YOUR LOCAL ROOFING DISTRIBUTOR
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import TravisWolfInverse from '@/assets/Travis-Wolf-Badge-Inverse.svg'

export default {
  name: 'MobileLogo',
  data () {
    return {

    }
  },
  computed: {
    travisWolfInverse () {
      return TravisWolfInverse
    }
  }
}
</script>

<style scoped>

</style>
