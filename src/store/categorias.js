import axios from 'axios';

const state = {
  categories: [],
  isLoading: false,
  error: null,
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
      const response = await axios.get('/api/categories');
      commit('setCategories', response.data);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading', false);
    }
  },
  async addCategory({ commit }, category) {
    try {
      const response = await axios.post('/api/categories', category);
      commit('newCategory', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async updateCategory({ commit }, category) {
    try {
      const response = await axios.put(`/api/categories/${category.id}`, category);
      commit('updateCategory', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async deleteCategory({ commit }, id) {
    try {
      await axios.delete(`/api/categories/${id}`);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
