<template>
  <div>
    <template v-if="!isChildRoute">
      <h1>Gestión de Usuarios</h1>
      <!-- Contenido específico de Gestión de Usuarios -->
    </template>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'GestionUsuarios',
  computed: {
    isChildRoute() {
      return this.$route.meta.hideParent;
    }
  }
}
</script>

<style scoped>
/* Estilos para la vista de Gestión de Usuarios */
</style>
