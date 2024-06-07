import axios from 'axios';
const config = 'http://localhost:8080/';

const state = {
  brands: [],
  isLoading: false,
  error: null,
  search: '',
  showAddModal: false,
  showEditModal: false,
  currentEditingBrand: null,
};

const getters = {
  allBrands: (state) => state.brands,
  isLoading: (state) => state.isLoading,
  getError: (state) => state.error,
};

const actions = {
  async fetchBrands({ commit }) {
    commit('setLoading', true);
    try {
      const response = await axios.get(`${config}/CAR_BRANDS/getAllCarBrands`);
      commit('setBrands', response.data);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addBrand({ commit }, brand) {
    try {
      const response = await axios.post(`${config}/CAR_BRANDS/addCarBrand`, brand);
      commit('newBrand', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async updateBrand({ commit }, brand) {
    try {
      const response = await axios.put(`${config}/CAR_BRANDS/updateCarBrand`, brand);
      commit('updateBrand', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async deleteBrand({ commit }, id) {
    try {
      await axios.delete(`${config}/CAR_BRANDS/deleteCarBrand`, { data: { id } });
      commit('removeBrand', id);
    } catch (error) {
      commit('setError', error);
    }
  },
};

const mutations = {
  setBrands: (state, brands) => (state.brands = brands),
  newBrand: (state, brand) => state.brands.push(brand),
  updateBrand: (state, updatedBrand) => {
    const index = state.brands.findIndex(brand => brand.id === updatedBrand.id);
    if (index!== -1) {
      state.brands.splice(index, 1, updatedBrand);
    }
  },
  removeBrand: (state, id) => (state.brands = state.brands.filter(brand => brand.id!== id)),
  setLoading: (state, isLoading) => (state.isLoading = isLoading),
  setError: (state, error) => (state.error = error),
  setShowAddModal: (state, value) => (state.showAddModal = value),
  setShowEditModal: (state, value) => (state.showEditModal = value),
  setCurrentEditingBrand: (state, brand) => (state.currentEditingBrand = brand),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
