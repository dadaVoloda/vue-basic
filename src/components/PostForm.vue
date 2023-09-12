<template>
  <form @submit.prevent="handleSubmit">
    <h3>Создание поста</h3>
    <my-input
      v-focus
      class="form__input"
      type="text"
      placeholder="Название"
      v-model.trim="post.title"
    />
    <my-input
      class="input"
      type="text"
      placeholder="Описание"
      v-model.trim="post.body"
    />
    <my-button class="form__btn">Создать</my-button>
  </form>
</template>

<script>
export default {
  emits: ['createPost'],
  data: () => ({
    post: {
      title: '',
      body: '',
    },
  }),
  methods: {
    handleSubmit() {
      const fieldsNotEmpty = this.post.title && this.post.body
      if (fieldsNotEmpty) {
        this.post.id = Date.now()
        this.$emit('createPost', this.post)
        this.post = {
          title: '',
          body: '',
        }
      }
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.form__input {
  margin-top: 15px;
}

.form__btn {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
