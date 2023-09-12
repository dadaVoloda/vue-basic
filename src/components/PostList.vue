<template>
  <div v-if="posts.length">
    <h3>Список постов</h3>
    <transition-group name="list" tag="div">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="(id) => $emit('removePost', id)"
      />
    </transition-group>
  </div>
  <h3 v-else>Список постов пуст</h3>
</template>

<script>
import PostItem from '@/components/PostItem.vue'

export default {
  components: { PostItem },
  emits: ['removePost'],
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
