import { createRouter, createWebHistory } from 'vue-router'

const Main = () => import('@/pages/Main.vue')
const PostsPage = () => import('@/pages/PostsPage.vue')
const PostPage = () => import('@/pages/PostPage.vue')
const About = () => import('@/pages/About.vue')
const PostsPageWithStore = () => import('@/pages/PostsPageWithStore.vue')
const PostsPageCompositionApi = () =>
  import('@/pages/PostsPageCompositionApi.vue')

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/posts/:id',
    component: PostPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/store',
    component: PostsPageWithStore,
  },
  {
    path: '/composition',
    component: PostsPageCompositionApi,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
