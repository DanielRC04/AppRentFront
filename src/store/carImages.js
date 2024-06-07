// Importa axios al inicio del archivo
import axios from 'axios';

const config = 'http://localhost:8080/';

const state = {
  images: [], 
  isLoading: false,
  error: null,
  search: '',
  showAddModal: false,
  showEditModal: false,
  currentEditingImage: null, 
};

const getters = {
  allImages: (state) => state.images, 
  isLoading: (state) => state.isLoading,
  getError: (state) => state.error,
};

const actions = {
  async fetchImages({ commit }) {
    commit('setLoading', true);
    try {
      const response = await axios.get(`${config}/CAR_IMAGES/getAllCarImages`);
      commit('setImages', response.data);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addImage({ commit }, image) {
    try {
      const response = await axios.post(`${config}/CAR_IMAGES/addCarImage`, image);
      commit('newImage', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async updateImage({ commit }, image) {
    try {
      const response = await axios.put(`${config}/CAR_IMAGES/updateCarImage`, image);
      commit('updateImage', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async deleteImage({ commit }, id) {
    try {
      await axios.delete(`${config}/CAR_IMAGES/deleteCarImage`, { data: { id } });
      commit('removeImage', id);
    } catch (error) {
      commit('setError', error);
    }
  },
};

const mutations = {
  setImages: (state, images) => (state.images = images),
  newImage: (state, image) => state.images.push(image),
  updateImage: (state, updatedImage) => {
    const index = state.images.findIndex(img => img.id === updatedImage.id);
    if (index!== -1) {
      state.images.splice(index, 1, updatedImage);
    }
  },
  removeImage: (state, id) => (state.images = state.images.filter(img => img.id!== id)),
  setLoading: (state, isLoading) => (state.isLoading = isLoading),
  setError: (state, error) => (state.error = error),
  setShowAddModal: (state, value) => (state.showAddModal = value),
  setShowEditModal: (state, value) => (state.showEditModal = value),
  setCurrentEditingImage: (state, image) => (state.currentEditingImage = image),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
