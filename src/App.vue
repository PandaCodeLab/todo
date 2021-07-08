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
html{
  font-size: 62.5%;
}
body{
  font-family: cursive;
}
h1{
  font-size: 2.5rem;
}
.container{
  max-width: 960px;
  margin: 0 auto;
}
.checked {
  text-decoration: line-through;
}
.vue-dialog-content{
  font-size: 2rem;
  text-align: center;
}
.vue-dialog-buttons button{
  font-size: 2rem;
}
.text-warning{
  font-size: 3rem;
  color: red
}
</style>
