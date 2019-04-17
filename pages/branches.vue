<template>
  <div>
    <v-layout
      row
      wrap
      class="constrain-content"
      justify-left
    >
      <v-flex xs12>
        <branch-map />
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <branch-grid />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BranchGrid from '@/components/BranchGrid.vue'
import BranchMap from '@/components/BranchMap.vue'

export default {
  name: 'Branches',
  components: {
    BranchGrid,
    BranchMap
  },
  data () {
    return {
      msg: 'Branches View'
    }
  }
}
</script>

<style scoped>

</style>
