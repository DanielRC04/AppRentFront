<template>
  <div class="car-images-container">
    <h1>Imágenes de Autos</h1>
    <div class="search-container">
      <input type="text" v-model="search" placeholder="Buscar..." />
      <span v-if="isLoading" class="loading-indicator">Buscando...</span>
      <button @click="openAddModal" class="add-button">
        <i class="fas fa-plus"></i> Agregar
      </button>
    </div>

    <table class="images-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, index) in allImages" :key="index">
          <td>{{ image.id }}</td>
          <td><img :src="image.src" alt="" style="width: 50px; height: 50px;"></td>
          <td>
            <button @click="openEditModal(image)" class="action-button">Editar</button>
            <button @click="deleteImage(image.id)" class="action-button">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para agregar imágenes de autos -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Agregar Imagen</h2>
        <form @submit.prevent="saveNewImage">
          <input type="file" @change="handleFileChange" accept="image/*" required>
          <hr> <!-- Elemento HR para separar visualmente -->
          <div class="buttons-container"> <!-- Contenedor para agrupar los botones -->
            <button type="submit" class="save-button">Guardar</button>
            <button type="button" @click="closeAddModal" class="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Editar Imagen</h2>
        <p>Actual URL: {{ currentEditingImage.src }}</p>
        <form @submit.prevent="saveUpdatedImage">
          <input v-model="currentEditingImage.src" type="text" placeholder="Nueva URL de la imagen" required>
          <hr> <!-- Elemento HR para separar visualmente -->
          <div class="buttons-container"> <!-- Contenedor para agrupar los botones -->
            <button type="submit" class="save-button">Actualizar</button>
            <button type="button" @click="closeEditModal" class="cancel-button">Cancelar</button>
            <button type="button" @click="uploadImage" class="upload-button">Subir Archivo</button> <!-- Botón de subir archivo -->
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'CarImages',
  data() {
    return {
      newImageFile: null, // Variable para almacenar el archivo seleccionado
    };
  },
  computed: {
  ...mapState('carImages', ['images', 'isLoading', 'error', 'showAddModal', 'showEditModal', 'search', 'currentEditingImage']),
  ...mapGetters('carImages', ['allImages']),
  },
  methods: {
  ...mapActions('carImages', ['fetchImages', 'deleteImage', 'addImage', 'updateImage']),
  ...mapMutations('carImages', ['setShowAddModal', 'setShowEditModal', 'setCurrentEditingImage']),
    handleFileChange(event) {
      this.newImageFile = event.target.files[0];
      // Aquí puedes agregar más lógica para procesar el archivo, como mostrar una vista previa
    },
    openAddModal() {
      this.setShowAddModal(true);
    },
    openEditModal(image) {
      this.setCurrentEditingImage(image);
      this.setShowEditModal(true);
    },
    closeAddModal() {
      this.setShowAddModal(false);
      this.newImageFile = null; 
    },
    closeEditModal() {
      this.setShowEditModal(false);
    },
    async saveNewImage() {
      if (!this.newImageFile) {
        alert("Por favor, seleccione un archivo.");
        return;
      }

      let formData = new FormData();
      formData.append('image', this.newImageFile);

      await this.addImage(formData);
      this.closeAddModal();
    },
    async saveUpdatedImage() {
      // Implementación similar a saveNewImage, pero para actualizar una imagen existente
    },
  },
  created() {
    this.fetchImages();
  }
};
</script>


<style scoped>
.car-images-container {
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

.images-table {
  width: 100%;
  border-collapse: collapse;
}

.images-table th, .images-table td {
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

.upload-button {
  background-color: #007bff;
  color: white; 
  border: none; 
  padding: 10px 20px; 
  margin-left: 10px;
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
}

.upload-button:hover {
  background-color: #0056b3; 
}

.buttons-container {
  display: flex; 
  justify-content: space-between; 
  margin-top: 20px; 
}

input[type="file"]::file-selector-button {
  background-color: #8ed890; 
  color: white; 
  font-weight: 600;
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s ease;
}

input[type="file"]::file-selector-button:hover {
  background-color: #45a049; 
}

</style>
