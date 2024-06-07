<template>
  <div>
    <template v-if="!isChildRoute">
      <h1>Gestión de Vehículos</h1>
      <!-- Contenido específico de Gestión de Vehículos -->
    </template>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'GestionVehiculos',
  computed: {
    isChildRoute() {
      return this.$route.meta.hideParent;
    }
  }
}
</script>

<style scoped>
/* Estilos para la vista de Gestión Vehículos */
</style>
