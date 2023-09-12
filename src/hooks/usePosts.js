import axios from 'axios'
import { ref, onMounted } from 'vue'

export default function usePosts({
  limit = { value: 10 },
  page = { value: 1 },
}) {
  const posts = ref([])
  const totalPages = ref(0)
  const isLoading = ref(true)

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _limit: limit.value,
            _page: page.value,
          },
        }
      )
      if (!totalPages.value) {
        totalPages.value = Math.ceil(
          response.headers['x-total-count'] / limit.value
        )
      }

      posts.value = response.data
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchPosts)

  return {
    fetchPosts,
    posts,
    totalPages,
    isLoading,
  }
}
