<template>
  <div class="container">
    <Navbar />
    <router-view />
    <v-dialog />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>

</style>
