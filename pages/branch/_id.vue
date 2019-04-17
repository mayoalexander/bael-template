<template>
  <div>
    <v-layout
      row
      class="constrain-content"
      justify-center
    >
      <v-flex xs12>
        <branch-map />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BranchMap from '@/components/BranchMap.vue'

export default {
  name: 'Branch',
  components: {
    BranchMap
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
