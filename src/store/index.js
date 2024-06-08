import { createStore } from 'vuex';
import categorias from './categorias';
import carImages from './carImages';
import carBrands from './carBrands';
import cars from './cars';

export default createStore({
  modules: {
    categorias,
    carImages,
    carBrands,
    cars,
  },
});
