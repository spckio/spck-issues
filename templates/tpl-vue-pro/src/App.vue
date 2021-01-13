<template>
  <div class="container">
    <img src="../res/logo-pro.png" width="50%">
    <h1>
      {{name}}
    </h1>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    data: function() {
      return {
        name: 'Welcome to your Vue.js App!',
      }
    },
  });
</script>

<style>
.container {
  text-align: center;
}
h1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: normal;
  color: #42b983;
}
</style>
