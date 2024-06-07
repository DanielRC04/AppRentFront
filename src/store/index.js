import { createStore } from 'vuex';
import categorias from './categorias';
import carImages from './carImages';
import carBrands from './carBrands';

export default createStore({
  modules: {
    categorias,
    carImages,
    carBrands,
  },
});
