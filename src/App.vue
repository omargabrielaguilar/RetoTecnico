<!-- En el archivo App.vue -->
<template>
  <div id="app">
    <Sidebar />
    <main>
      <!-- Aquí irá el contenido principal -->
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
}

</style>
