import axios from 'axios';
const config = 'http://localhost:3002/CARS';
const brands = 'http://localhost:3002/BRANDS';
const categories = 'http://localhost:3002/CAR_CATEGORIES';

const state = {
  vehicles: [],
  isLoading: false,
  error: null,
  search: '',
  showAddModal: false,
  showEditModal: false,
  currentEditingVehicle: null,
};

const getters = {
  allVehicles: (state) => state.vehicles,
  allDetailVehicles: (state) => state.vehicles,
  isLoading: (state) => state.isLoading,
  getError: (state) => state.error,
};

const actions = {
  async fetchVehicles({ commit }) {
    commit('setLoading', true);
    try {
      const response = await axios.get(`${config}/getAllCars`);
      const vehiclesWithDetails = await Promise.all(response.data.data[0].map(async (vehicle) => {

        const brandResponse = await axios.post(`${brands}/getBrand`, { id: vehicle.BrandId });
       
        const carCategoryResponse = await axios.post(`${categories}/getCarCategory`, {id: vehicle.CarCategoryId});
        return {
         ...vehicle,
          Brand: brandResponse.data.data[0].Name,
          CarCategory: carCategoryResponse.data.data[0].Name,
        };
      }));
      commit('setVehicles', vehiclesWithDetails);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async fetchDetailedVehicles({ commit }) {
    commit('setLoading', true);
    try {
      const response = await axios.get(`${config}/getAllCars`);
      const vehiclesWithDetails = await Promise.all(response.data.data.map(async (vehicle) => {
        const carCategoryResponse = await axios.post(`${categories}/getCarCategory`, { id: vehicle.CarCategoryId });
        return {
         ...vehicle,
          CarCategory: carCategoryResponse.data.data[0].Name,
        };
      }));
      console.log(vehiclesWithDetails)
      commit('setDetailedVehicles', vehiclesWithDetails);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  
  async addVehicle({ commit }, vehicle) {
    try {
      const response = await axios.post(`${config}/addCar`, vehicle);
      commit('newVehicle', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async updateVehicle({ commit }, vehicle) {
    try {
      const response = await axios.put(`${config}/updateCar/${vehicle.id}`, vehicle);
      commit('updateVehicle', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async deleteVehicle({ commit }, id) {
    try {
      await axios.delete(`${config}/deleteCar/${id}`);
      commit('removeVehicle', id);
    } catch (error) {
      commit('setError', error);
    }
  },
};

const mutations = {
  setVehicles: (state, vehicles) => (state.vehicles = vehicles),
  setDetailedVehicles: (state, vehicles) => (state.vehicles = vehicles),
  newVehicle: (state, vehicle) => state.vehicles.push(vehicle),
  updateVehicle: (state, updatedVehicle) => {
    const index = state.vehicles.findIndex(vehicle => vehicle.id === updatedVehicle.id);
    if (index!== -1) {
      state.vehicles.splice(index, 1, updatedVehicle);
    }
  },
  removeVehicle: (state, id) => (state.vehicles = state.vehicles.filter(vehicle => vehicle.id!== id)),
  setLoading: (state, isLoading) => (state.isLoading = isLoading),
  setError: (state, error) => (state.error = error),
  setShowAddModal: (state, value) => (state.showAddModal = value),
  setShowEditModal: (state, value) => (state.showEditModal = value),
  setCurrentEditingVehicle: (state, vehicle) => (state.currentEditingVehicle = vehicle),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
