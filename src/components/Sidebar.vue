<template>
  <div class="sidebar">
    <div class="logo">
      <img src="/logo.png" alt="logo" class="logo-image" />
    </div>
    <ul>
      <li :class="{ 'active': isRouteActive('/') }" @click="navigateToHome">Home</li>
      <li :class="{ 'active': isRouteActive('/vista/1') }" @click="navigateToView(1)">Vista 1</li>
      <li :class="{ 'active': isRouteActive('/vista/2') }" @click="navigateToView(2)">Vista 2</li>
    </ul>
  </div>
</template>
  
<script>
export default {
  methods: {
    // Navegar a la página de inicio y muestra un mensaje de registro
    navigateToHome() {
      this.$router.push('/');
      console.log('Navegar a la página de inicio');
    },
    // Navegara la vista con el número proporcionado y muestra un mensaje de registro
    navigateToView(viewNumber) {
      console.log(`Navegar a Vista ${viewNumber}`);
      this.$router.push(`/vista/${viewNumber}`);
    },
    // Verificar si la ruta actual coincide con la ruta proporcionada utilizando $route, esto más que todo cuando este en la vista que le corresponde, esta parte estara activa con el background color correspondiente
    isRouteActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap');

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;
  height: 100vh;
  background-color: #676767;
  padding: 10px;
  box-sizing: border-box;
  font-family: 'Raleway', sans-serif;
  z-index: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}


.logo {
  display: flex;
  margin-bottom: 2em;
  justify-content: center;
}

.logo-image {
  width: 60%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

li {
  font-size: 1.4rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-bottom: none;
  padding: 8px 20px;
}

li:hover {
  background-color: white;
  color: #676767;
}

li.active {
  background-color: white;
  color: #676767;
}
</style>
  