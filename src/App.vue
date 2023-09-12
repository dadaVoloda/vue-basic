<template>
  <div class="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  components: { Navigation },
}
</script>

<style scoped></style>
