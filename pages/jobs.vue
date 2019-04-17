<template>
  <div>
    <br>
    <!-- Travis Jobs Slug -->
    <v-layout
      row
      class="constrain-content"
      justify-space-around
    >
      <travis-jobs />
    </v-layout>
  </div>
</template>

<script>
import TravisJobs from '@/components/TravisJobs.vue'

export default {
  name: 'Jobs',
  components: {
    TravisJobs
  },
  data () {
    return {
      msg: 'This is Travis Jobs view.'
    }
  }
}
</script>

<style scoped>

  .constrain-content { /*APPLY THIS CLASS TO RAW CONTENT IN THIS VIEW*/
    width: 100%;
    max-width: 1440px;
    margin: auto;
  }

</style>
