<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model.trim="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
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
import axios from 'axios'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: { PostForm, PostList, Pagination },
  data: () => ({
    posts: [],
    dialogVisible: false,
    isLoading: true,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      {
        value: 'title',
        name: 'По названию',
      },
      {
        value: 'body',
        name: 'По описанию',
      },
    ],
    observer: null,
  }),
  methods: {
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
    // changePage(page) {
    //   this.page = page
    // },
    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          }
        )
        if (!this.totalPages) {
          this.totalPages = Math.ceil(
            response.headers['x-total-count'] / this.limit
          )
        }
        this.posts = response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async loadMorePosts() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: this.limit,
              _page: ++this.page,
            },
          }
        )

        this.posts = [...this.posts, ...response.data]
      } catch (error) {
        console.log(error)
      }
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
    sortedPosts() {
      return this.selectedSort
        ? [...this.posts].sort((prev, next) =>
            prev[this.selectedSort].localeCompare(next[this.selectedSort])
          )
        : this.posts
    },
    sortedAndSearchedPosts() {
      return this.searchQuery
        ? this.sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.sortedPosts
    },
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
