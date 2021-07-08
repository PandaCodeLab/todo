<template>
  <div class="navbar">
    <router-link to="/">Список заметок</router-link>
    <router-link to="/create">Создать заметку</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
.navbar{
  padding: 1rem 0 0;
  font-size: 1.5rem;
  a{
    margin-right: 1rem;
    font-size: 2rem;
  }
}
</style>
