

  <template>
  <div>
    <template v-if="!isChildRoute">
      <h1>Gestión de Vehículos</h1>
      <div class="vehiculos-container">
    <h1>Vehículos</h1>
    <div class="search-container">
      <input type="text" v-model="search" placeholder="Buscar vehículo..." />
      <span v-if="isLoading" class="loading-indicator">Cargando...</span>
      <button @click="openAddModal" class="add-button">
        <i class="fas fa-plus"></i> Agregar Vehículo
      </button>
    </div>

    <table class="vehicles-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Precio por Hora</th>
      <th>Stock</th>
      <th>Modelo</th>
      <th>Placa</th>
      <th>Marca</th>
      <th>Categoría de Coche</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(vehiculo, index) in allVehicles" :key="index">
      
      <td>{{ vehiculo.Id }}</td>
      <td>{{ vehiculo.Name }}</td>
      <td>{{ vehiculo.Description }}</td>
      <td>{{ vehiculo.PriceHour }}</td>
      <td>{{ vehiculo.Stock }}</td>
      <td>{{ vehiculo.Model }}</td>
      <td>{{ vehiculo.LicensePlate }}</td>
      <td>{{ vehiculo.Brand}}</td> <!-- Asume que tienes acceso al nombre de la marca -->
      <td>{{ vehiculo.CarCategory }}</td> <!-- Asume que tienes acceso al nombre de la categoría de coche -->
      <td>
        <button @click="openEditModal(vehiculo)" class="action-button">Editar</button>
        <button @click="deleteVehicle(vehiculo.id)" class="action-button">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>

<!-- Modal para agregar vehículo -->
<div v-if="showAddModal" class="modal-overlay">
  <div class="modal-content">
    <h2 style="font-size: 20px; margin-bottom: 10px;">Agregar Vehículo</h2>
    <form @submit.prevent="saveNewVehicle">
      <input type="text" v-model="newVehicleName" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" placeholder="Nombre del vehículo" required />

      <textarea v-model="newVehicleDescription" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" placeholder="Descripción" required></textarea>

      <input type="number" v-model.number="newVehiclePriceHour" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" placeholder="Precio por Hora" required />

      <input type="number" v-model.number="newVehicleStock" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" placeholder="Stock" required />

      <input type="text" v-model="newVehicleModel" placeholder="Modelo" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" required />

      <input type="text" v-model="newVehicleLicensePlate" placeholder="Placa" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" required />

      <select v-model="newVehicleBrandId" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;">
        <option v-for="brand in allVehicles" :key="brand.Id" :value="brand.Id">{{ brand.Name }}</option>
      </select>

      <select v-model="newVehicleCarCategoryId" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;">
        <option v-for="CarCategory in allDetailVehicles" :key="CarCategory.Id" :value="CarCategory.Id">{{ CarCategory.Name }}</option>
      </select>

      <hr style="border-top: 1px solid #ddd; margin-bottom: 10px;" />

      <div class="modal-actions">
        <button type="submit" class="save-button" style="background-color: #4CAF50; margin-bottom: 20px; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Guardar</button>
        <button @click="closeAddModal" class="cancel-button" style="background-color: #f44336; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Cancelar</button>
      </div>
    </form>
  </div>
</div>


    <!-- Modal para editar vehículo -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Editar Vehículo</h2>
        <input type="text" v-model="currentEditingVehicle.name" placeholder="Nombre del vehículo" />
        <select v-model="newVehicleBrandId">
          <option v-for="brand in allBrands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
        </select>

        <input type="text" v-model="currentEditingVehicle.model" placeholder="Modelo" />
        <input type="text" v-model="currentEditingVehicle.licensePlate" placeholder="Placa" />
        <div class="modal-actions">
          <button @click="saveUpdatedVehicle" class="save-button">Guardar</button>
          <button @click="closeEditModal" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
    </template>
    <router-view />
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'GestionVehiculos',
  data() {
    return {
      newVehicleName: '',
      newVehicleDescription: '',
      newVehiclePriceHour: '',
      newVehicleStock: '',
      newVehicleBrandId: '',
      newVehicleModel: '',
      newVehicleLicensePlate: '',
      newVehicleCarCategoryId: '',
      isChildRoute: false,
    };
  },
  computed: {
  ...mapState('cars', ['vehicles', 'isLoading', 'error', 'showAddModal', 'showEditModal', 'search', 'currentEditingVehicle']),
  ...mapGetters('cars', ['allVehicles',  'allDetailVehicles']),
  },
  methods: {
  ...mapActions('cars', ['fetchVehicles', 'deleteVehicle', 'addVehicle', 'updateVehicle']),
  ...mapMutations('cars', ['setShowAddModal', 'setShowEditModal', 'setCurrentEditingVehicle']),
    openAddModal() {
      this.setShowAddModal(true);
    },
    openEditModal(vehicle) {
      this.setCurrentEditingVehicle(vehicle);
      this.setShowEditModal(true);
    },
    closeAddModal() {
      this.setShowAddModal(false);
      this.newVehicleName = '';
      this.newVehicleBrandId = '';
      this.newVehicleModel = '';
      this.newVehicleLicensePlate = '';
    },
    closeEditModal() {
      this.setShowEditModal(false);
    },
    async saveNewVehicle() {
      await this.addVehicle({
        name: this.newVehicleName,
        brandId: this.newVehicleBrandId,
        model: this.newVehicleModel,
        licensePlate: this.newVehicleLicensePlate,
      });
      this.closeAddModal();
    },
    async saveUpdatedVehicle() {
      await this.updateVehicle(this.currentEditingVehicle);
      this.closeEditModal();
    },
  },
  created() {
    this.fetchVehicles();
  }
};
</script>

<style scoped>
.vehiculos-container {
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

.vehicles-table {
  width: 100%;
  border-collapse: collapse;
}

.vehicles-table th, .vehicles-table td {
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
