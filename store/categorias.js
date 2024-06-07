import axios from 'axios';
const config = 'http://localhost:8080/';

const state = {
  categories: [],
  isLoading: false,
  error: null,
  search: '',
  showAddModal: false,
  showEditModal: false,
  currentEditingCategory: null,
};

const getters = {
  allCategories: (state) => state.categories,
  isLoading: (state) => state.isLoading,
  getError: (state) => state.error,
};

const actions = {
  async fetchCategories({ commit }) {
    commit('setLoading', true);
    try {
      const response = await axios.get(`${config}/CAR_CATEGORIES/getAllCarCategories`);
      commit('setCategories', response.data);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addCategory({ commit }, category) {
    try {
      console.log("Adding category")
      const response = await axios.post(`${config}/CAR_CATEGORIES/addCarCategory`, category);
      commit('newCategory', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async updateCategory({ commit }, category) {
    try {
      const response = await axios.put(`${config}/CAR_CATEGORIES/updateCarCategory`, category);
      commit('updateCategory', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async deleteCategory({ commit }, id) {
    try {
      await axios.delete(`${config}/CAR_CATEGORIES/deleteCarCategory`, { data: { id } });
      commit('removeCategory', id);
    } catch (error) {
      commit('setError', error);
    }
  },
};

const mutations = {
  setCategories: (state, categories) => (state.categories = categories),
  newCategory: (state, category) => state.categories.push(category),
  updateCategory: (state, updatedCategory) => {
    const index = state.categories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },
  removeCategory: (state, id) => (state.categories = state.categories.filter(category => category.id !== id)),
  setLoading: (state, isLoading) => (state.isLoading = isLoading),
  setError: (state, error) => (state.error = error),
  setShowAddModal: (state, value) => (state.showAddModal = value),
  setShowEditModal: (state, value) => (state.showEditModal = value),
  setCurrentEditingCategory: (state, category) => (state.currentEditingCategory = category),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
