<template>
  <nav class="navbar">
    <ul class="menu">
      <li class="menu-item">
        <router-link to="/gestion-vehiculos" class="menu-link">Gestión Vehículos <i class="fas fa-car"></i></router-link>
        <ul class="submenu">
          <li><router-link to="/gestion-vehiculos/categorias" class="submenu-link"><i class="fas fa-list"></i> Categorías</router-link></li>
          <li><router-link to="/gestion-vehiculos/imagenes" class="submenu-link"><i class="fas fa-image"></i> Imágenes</router-link></li>
          <li><router-link to="/gestion-vehiculos/marcas" class="submenu-link"><i class="fas fa-tag"></i> Marcas</router-link></li>
        </ul>
      </li>
      <li class="menu-item">
        <router-link to="/gestion-usuarios" class="menu-link">Gestión Usuarios <i class="fas fa-users"></i></router-link>
        <ul class="submenu">
          <li><router-link to="/gestion-usuarios/departamentos" class="submenu-link"><i class="fas fa-building"></i> Departamentos</router-link></li>
          <li><router-link to="/gestion-usuarios/ciudades" class="submenu-link"><i class="fas fa-city"></i> Ciudades</router-link></li>
        </ul>
      </li>
      <li class="menu-item">
        <router-link to="/gestion-rentas" class="menu-link">Gestión Rentas <i class="fas fa-money-check-alt"></i></router-link>
      </li>
      <li class="menu-item">
        <router-link to="/settings" class="menu-link">Configuración <i class="fas fa-gear"></i></router-link>
      </li>
      <li class="menu-item">
        <button @click="logout" class="logout-button"><i class="fas fa-sign-out-alt"></i></button>
      </li>

    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MenuSuperior'
}
</script>

<style scoped>
.navbar {
  position: relative;
  background-color: #a7dcca;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu-item {
  position: relative;
  margin-right: 1.5em;
}

.menu-link,
.submenu-link {
  color: rgb(75, 71, 71);
  text-decoration: none;
  padding: 0.5em 1em;
  transition: background-color 0.3s;
}

.menu-link:hover,
.submenu-link:hover {
  background-color: #425391;
  color: white;
}

.submenu {
  display: none;
  list-style: none;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #a7dcca; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0.5em 0;
  z-index: 1000;
  width: 100%;
}

.menu-item:hover >.submenu {
  display: block;
}




.submenu li {
  margin: 0;
}

.submenu li a {
  display: block;
  width: 100%;
  text-align: center;
}

.logout-button {
  position: absolute;
  top: 0;
  background-color: transparent;
  border: none;
  color: #494b55;
  cursor: pointer;
  font-size: 1.2em;
  left: 620px; /* Ajusta el padding según sea necesario */
}

</style>
