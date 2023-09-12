<template>
  <nav class="nav">
    <router-link to="/">Главная</router-link>
    <router-link to="/posts">Посты</router-link>
    <router-link to="/about">О сайте</router-link>
    <router-link to="/store">Store</router-link>
    <router-link to="/composition">Composition Api</router-link>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 12px;
  color: blue;
}

a {
  transition: 0.3s;
  opacity: 0.6;
}

.router-link-active {
  opacity: 1;
}
</style>
