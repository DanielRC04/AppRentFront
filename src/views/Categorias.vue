<template>
  <div class="categorias-container">
    <h1>Categorías</h1>
    <div class="search-container">
      <input type="text" v-model="search" placeholder="Buscar..." />
      <span v-if="isLoading" class="loading-indicator">Buscando...</span>
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
        <tr v-for="(categoria, index) in allCategories" :key="index">
          <td>{{ categoria.Id }}</td>
          <td>{{ categoria.Name }}</td>
          <td>
            <button @click="openEditModal( this.newCategoryId = categoria.Id)" class="action-button">Editar</button>
            <button @click="deleteCategory(categoria.Id)" class="action-button">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para agregar categoría -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Agregar Categoría</h2>
        <p>ID: {{ newCategoryId }}</p>
        <input type="text" v-model="newCategoryName" placeholder="Nombre de la categoría" />
        <div class="modal-actions">
          <button @click="saveNewCategory"  class="save-button">Guardar</button>
          <button @click="closeAddModal" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal para editar categoría -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Editar Categoría</h2>
        <input type="text" v-model="currentEditingCategory" placeholder="Nombre de la categoría" />
        <div class="modal-actions">
          <button @click="saveUpdatedCategory" class="save-button">Guardar</button>
          <button @click="closeEditModal" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'CategoriasCarros',
  data() {
    return {
      newCategoryName: '',
      newCategoryId: '',
      currentEditingCategory: '',
    };
  },
  computed: {
    ...mapState('categorias', ['categories', 'isLoading', 'error', 'showAddModal', 'showEditModal', 'search', 'currentEditingCategory']),
    ...mapGetters('categorias', ['allCategories']),

  },
  methods: {
    ...mapActions('categorias', ['fetchCategories', 'deleteCategory', 'addCategory', 'updateCategory']),
    ...mapMutations('categorias', ['setShowAddModal', 'setShowEditModal', 'setCurrentEditingCategory']),
    openAddModal() {
      this.setShowAddModal(true);
    },
    openEditModal(ID) {
      this.setCurrentEditingCategory(ID);
      this.setShowEditModal(true);
    },
    closeAddModal() {
      this.setShowAddModal(false);
      this.newCategoryName = '';
    },
    closeEditModal() {
      this.setShowEditModal(false);
      this.currentEditingCategory = '';
    },
    async saveNewCategory() {
      await this.addCategory({ name: this.newCategoryName });
      this.closeAddModal();
    },
    async saveUpdatedCategory() {
      console.log(this.currentEditingCategory, this.newCategoryId);

      const data = { name: this.currentEditingCategory, id: this.newCategoryId };
      await this.updateCategory(data);
      this.closeEditModal();
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}
</style>
