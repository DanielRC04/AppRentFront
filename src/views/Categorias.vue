<template>
  <div class="categorias-container">
    <h1>Categorías</h1>
    <div class="search-container">
      <input type="text" v-model="search" placeholder="Buscar..." />
      <span v-if="loading" class="loading-indicator">Buscando...</span>
      <button @click="openAddModal" class="add-button">
        <i class="fas fa-plus"></i> Agregar
      </button>
    </div>

    <table class="categories-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(categoria, index) in filteredCategories" :key="index">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>
            <button @click="editCategory(categoria)" class="action-button">Editar</button>
            <button @click="deleteCategory(categoria.id)" class="action-button">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-if="showAddModal" @close="showAddModal = false">
      <!-- Contenido del modal para agregar -->
    </modal>
    <modal v-if="showEditModal" @close="showEditModal = false">
      <!-- Contenido del modal para editar -->
    </modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'CategoriasCarros',
  computed: {
    ...mapState('categorias', ['categories', 'search', 'showAddModal', 'showEditModal', 'currentEditingCategory']),
    ...mapGetters('categorias', ['filteredCategories']),
  },
  methods: {
    ...mapActions('categorias', ['fetchCategories', 'openAddModal', 'editCategory', 'deleteCategory']),
    setSearch(event) {
      this.$store.commit('categorias/setSearch', event.target.value);
    },
    closeAddModal() {
      this.$store.commit('categorias/setShowAddModal', false);
    },
    closeEditModal() {
      this.$store.commit('categorias/setShowEditModal', false);
    },
  },
  created() {
    this.fetchCategories();
  }
};
</script>
<style scoped>
.categorias-container {
  max-width: 800px;
  margin: auto;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-button {
  order: 2;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.add-button i {
  margin-right: 8px;
}

.add-button:hover {
  background-color: #218838;
}

.loading-indicator {
  color: #888;
  margin-right: 10px;
}

input[type="text"] {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
}

input[type="text"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table th, .categories-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
