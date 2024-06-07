import { createRouter, createWebHistory } from 'vue-router';
import Categorias from '@/views/Categorias.vue';
import Imagenes from '@/views/Imagenes.vue';
import Marcas from '@/views/Marcas.vue';
import Ciudades from '@/views/Ciudades.vue';
import Departamentos from '@/views/Departamentos.vue';
import GestionVehiculos from '@/views/GestionVehiculos.vue';
import GestionUsuarios from '@/views/GestionUsuarios.vue';
import GestionRentas from '@/views/GestionRentas.vue';
import Configuracion from '@/views/Configuracion.vue';

const routes = [
  {
    path: '/gestion-vehiculos',
    component: GestionVehiculos,
    children: [
      { path: 'categorias', component: Categorias, meta: { hideParent: true }},
      { path: 'imagenes', component: Imagenes, meta: { hideParent: true }},
      { path: 'marcas', component: Marcas, meta: { hideParent: true }},
    ],
  },
  {
    path: '/gestion-usuarios',
    component: GestionUsuarios,
    children: [
      { path: 'departamentos', component: Departamentos, meta: { hideParent: true }},
      { path: 'ciudades', component: Ciudades, meta: { hideParent: true }},
    ],
  },
  { path: '/gestion-rentas', component: GestionRentas },
  { path: '/settings', component: Configuracion },
  { path: '/', redirect: '/gestion-vehiculos' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
