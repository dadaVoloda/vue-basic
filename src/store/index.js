import { createStore } from 'vuex'
import { postModule } from '@/store/postModule'

const store = createStore({
  modules: {
    post: postModule,
  },
})

export default store
