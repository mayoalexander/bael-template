<template lang="html">
  <v-layout

    fill-height
    justify-center
    align-center
    row
    wrap
    class="text-xs-center py-5"
  >
    <v-flex>
      <v-progress-circular
        :size="70"
        :width="7"
        color="travisBrand"
        indeterminate
      />
      <h1>Loading...</h1>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
