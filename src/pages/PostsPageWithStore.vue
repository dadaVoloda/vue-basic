<template>
  <div>
    <h1>Страница с постами</h1>

    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @createPost="addPost" />
    </my-dialog>
    <div v-if="isLoading">Loading...</div>
    <post-list
      v-else
      :posts="sortedAndSearchedPosts"
      @removePost="removePost"
    />
    <div ref="observer" class="observer"></div>
    <!-- <pagination
      class="app__pagination"
      :currentPage="page"
      :pages="totalPages"
      @changePage="changePage"
    /> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import Pagination from '@/components/Pagination.vue'

import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: { PostForm, PostList, Pagination },
  data: () => ({
    dialogVisible: false,
    observer: null,
  }),
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
    }),
    addPost(post) {
      this.posts.push(post)
      this.hideDialog()
    },
    removePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id)
    },
    hideDialog() {
      this.dialogVisible = false
    },
    showDialog() {
      this.dialogVisible = true
    },
  },
  mounted() {
    this.fetchPosts()

    this.observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    })

    this.observer.observe(this.$refs.observer)
  },
  unmounted() {
    this.observer.disconnect()
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
  watch: {
    // selectedSort(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     this.posts.sort((prev, next) =>
    //       prev[this.selectedSort].localeCompare(next[this.selectedSort])
    //     )
    //   }
    // },
    // page() {
    //   this.fetchPosts()
    // },
  },
}
</script>

<style scoped>
.app__btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}
.app__pagination {
  display: flex;
  justify-content: center;
  gap: 1px;
  margin-top: 20px;
}

.observer {
  transform: translateY(-70px);
}
</style>
