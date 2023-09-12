<template>
  <div>
    <my-button
      :class="{ active: currentPage === page }"
      v-for="page in pages"
      :key="page"
      @click="$emit('changePage', page)"
      >{{ page }}</my-button
    >
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.active {
  box-shadow: inset 0 0 0 1px darkolivegreen;
}
</style>
