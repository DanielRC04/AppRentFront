<template>
  <div class="marcas-container">
    <h1>Marcas</h1>
    <div class="search-container">
      <input type="text" v-model="search" placeholder="Buscar marca..." />
      <span v-if="isLoading" class="loading-indicator">Buscando...</span>
      <button @click="openAddModal" class="add-button">
        <i class="fas fa-plus"></i> Agregar
      </button>
    </div>

    <table class="brands-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(marca, index) in allBrands" :key="index">
          <td>{{ marca.id }}</td>
          <td>{{ marca.nombre }}</td>
          <td>
            <button @click="openEditModal(marca)" class="action-button">Editar</button>
            <button @click="deleteBrand(marca.id)" class="action-button">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para agregar marca -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Agregar Marca</h2>
        <input type="text" v-model="newBrandName" placeholder="Nombre de la marca" />
        <div class="modal-actions">
          <button @click="saveNewBrand" class="save-button">Guardar</button>
          <button @click="closeAddModal" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal para editar marca -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Editar Marca</h2>
        <input type="text" v-model="currentEditingBrand.nombre" placeholder="Nombre de la marca" />
        <div class="modal-actions">
          <button @click="saveUpdatedBrand" class="save-button">Guardar</button>
          <button @click="closeEditModal" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'CarsBrands',
  data() {
    return {
      newBrandName: ''
    };
  },
  computed: {
   ...mapState('carBrands', ['brands', 'isLoading', 'error', 'showAddModal', 'showEditModal', 'search', 'currentEditingBrand']),
   ...mapGetters('carBrands', ['allBrands']),
  },
  methods: {
   ...mapActions('carBrands', ['fetchBrands', 'deleteBrand', 'addBrand', 'updateBrand']),
   ...mapMutations('carBrands', ['setShowAddModal', 'setShowEditModal', 'setCurrentEditingBrand']),
    openAddModal() {
      this.setShowAddModal(true);
    },
    openEditModal(brand) {
      this.setCurrentEditingBrand(brand);
      this.setShowEditModal(true);
    },
    closeAddModal() {
      this.setShowAddModal(false);
      this.newBrandName = '';
    },
    closeEditModal() {
      this.setShowEditModal(false);
    },
    async saveNewBrand() {
      await this.addBrand({ nombre: this.newBrandName });
      this.closeAddModal();
    },
    async saveUpdatedBrand() {
      await this.updateBrand(this.currentEditingBrand);
      this.closeEditModal();
    },
  },
  created() {
    this.fetchBrands();
  }
};
</script>

<!-- Estilos similares a los de CategoriasCarros.vue, ajustados según sea necesario -->
<style scoped>
.marcas-container {
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

.marcas-table {
  width: 100%;
  border-collapse: collapse;
}

.marcas-table th, .marcas-table td {
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