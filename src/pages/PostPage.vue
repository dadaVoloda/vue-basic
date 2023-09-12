<template>
  <div>
    <h1>Страница поста {{ post.id }}</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    post: {},
    isLoading: true,
  }),
  mounted() {
    this.fetchPost()
  },
  methods: {
    async fetchPost() {
      try {
        this.isLoading = true
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              id: this.$route.params.id,
            },
          }
        )
        this.post = response.data[0]
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped></style>
