import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state, getters) {
      return state.selectedSort
        ? [...state.posts].sort((prev, next) =>
            prev[state.selectedSort].localeCompare(next[state.selectedSort])
          )
        : state.posts
    },
    sortedAndSearchedPosts(state, getters) {
      return state.searchQuery
        ? getters.sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : getters.sortedPosts
    },
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload
    },
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setSelectedSort(state, payload) {
      state.selectedSort = payload
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },
    setPage(state, payload) {
      state.page = payload
    },
    setTotalPages(state, payload) {
      state.totalPages = payload
    },
  },
  actions: {
    async fetchPosts({ state, commit, dispatch }) {
      try {
        commit('setLoading', true)
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        )
        if (!state.totalPages) {
          commit(
            'setTotalPages',
            Math.ceil(response.headers['x-total-count'] / state.limit)
          )
        }
        commit('setPosts', response.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    },
    async loadMorePosts({ state, commit, dispatch }) {
      try {
        commit('setPage', state.page + 1)
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        )

        commit('setPosts', [...state.posts, ...response.data])
      } catch (error) {
        console.log(error)
      }
    },
  },
  namespaced: true,
}
