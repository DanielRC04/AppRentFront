<template>
  <div id="app">
    <MenuSuperior />
    <router-view />
  </div>
</template>

<script>
import MenuSuperior from './components/MenuSuperior.vue';
import '@fortawesome/fontawesome-free/css/all.css';


export default {
  name: 'App',
  components: {
    MenuSuperior
  }
}
</script>

<style>
/* Estilos globales */
body {
  font-family: Arial, sans-serif;
}

#app {
  text-align: center;
}
</style>
