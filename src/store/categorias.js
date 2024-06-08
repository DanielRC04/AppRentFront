import axios from 'axios';
const config = 'http://localhost:3002/CAR_CATEGORIES';

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
      const response = await axios.get(`${config}/getAllCarCategories`);
      commit('setCategories', response.data.data[0]);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addCategory({ commit }, category) {
    try {
      const response = await axios.post(`${config}/addCarCategory`, category);
      commit('newCategory', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  
  async updateCategory({ commit } , data) {
    try {
      console.log(data);
      const response = await axios.put(`${config}/updateCarCategory`, {name: data.name, id: data.id});
      commit('updateCategory', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  
  async deleteCategory({ commit }, id) {
    try {
      await axios.delete(`${config}/deleteCarCategory`, { data: { id } });
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
    if (index!== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },
  removeCategory: (state, id) => (state.categories = state.categories.filter(category => category.id!== id)),
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
