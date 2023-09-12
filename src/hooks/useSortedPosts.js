import { ref, computed } from 'vue'

export default function useSortedPosts(posts) {
  const selectedSort = ref('')

  const sortedPosts = computed(() => {
    if (selectedSort.value) {
      return selectedSort.value === 'id'
        ? [...posts.value].sort(
            (prev, next) => prev[selectedSort.value] - next[selectedSort.value]
          )
        : [...posts.value].sort((prev, next) =>
            prev[selectedSort.value].localeCompare(next[selectedSort.value])
          )
    }

    return posts.value
  })

  return { selectedSort, sortedPosts }
}
