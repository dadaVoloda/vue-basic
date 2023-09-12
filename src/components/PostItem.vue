<template>
  <div class="post">
    <div>
      <div><strong>Id:</strong> {{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post.id)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['remove'],
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid darkolivegreen;
  margin-top: 15px;
}

.post__btns {
  display: flex;
  gap: 4px;
  margin-left: 10px;
}
</style>
