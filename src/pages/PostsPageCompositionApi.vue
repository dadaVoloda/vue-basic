<script setup>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import Pagination from '@/components/Pagination.vue'

import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
import { ref, watch } from 'vue'

const dialogVisible = ref(false)
const page = ref(1)
const limit = ref(10)
const sortOptions = ref([
  {
    value: 'id',
    name: 'По id',
  },
  {
    value: 'title',
    name: 'По названию',
  },
  {
    value: 'body',
    name: 'По описанию',
  },
])

const { posts, totalPages, isLoading, fetchPosts } = usePosts({ page, limit })
const { selectedSort, sortedPosts } = useSortedPosts(posts)
const { searchQuery, sortedAndSearchedPosts } =
  useSortedAndSearchedPosts(sortedPosts)

watch(page, () => {
  fetchPosts()
})

function addPost(post) {
  posts.value.push(post)
  hideDialog()
}
function removePost(id) {
  posts.value = posts.value.filter((post) => post.id !== id)
}
function hideDialog() {
  dialogVisible.value = false
}
function showDialog() {
  dialogVisible.value = true
}
function changePage(pageNum) {
  page.value = pageNum
}
</script>

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
    <pagination
      v-if="totalPages"
      class="app__pagination"
      :currentPage="page"
      :pages="totalPages"
      @changePage="changePage"
    />
  </div>
</template>

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
