<template>
  <div class="relative inline-block">
    <!-- Barra de filtro y etiqueta seleccionada -->
    <div class="continent-filter flex items-center space-x-2 cursor-pointer" @click="toggleDropdown">
      <span>{{ selectedContinent ? selectedContinent : 'Todos los continentes' }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>

    <!-- Menú desplegable de continentes -->
    <div v-if="dropdownOpen" class="dropdown-menu absolute mt-2 bg-white border rounded-md shadow-lg overflow-hidden z-10"
      style="top: 100%; left: 0; max-width: 80vw;">

      <!-- Trabajando con grid y tailwind -->
      <div class="sm:grid sm:grid-cols-3 sm:gap-2 p-2">
        <!-- Elemento para seleccionar 'Todos los continentes' -->
        <div @click="selectContinent('')" class="text-center cursor-pointer">
          <span class="text-sm">?</span>
        </div>
        <!-- Elementos para seleccionar continentes específicos -->
        <div v-for="continent in continents" :key="continent" @click="selectContinent(continent)"
          class="text-center cursor-pointer">
          <span class="text-sm">{{ continent }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    continents: Array, // Propiedad que recibe la lista de continentes
    updateSelectedContinent: Function, // Función para actualizar el continente seleccionado
  },
  setup(props) {
    const selectedContinent = ref("");
    const dropdownOpen = ref(false);

    // Función para alternar la visibilidad del menú desplegable
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Función para seleccionar un continente y cerrar el menú desplegable
    const selectContinent = (continent) => {
      selectedContinent.value = continent;
      props.updateSelectedContinent(continent);
      dropdownOpen.value = false;
    };

    return {
      selectedContinent,
      dropdownOpen,
      toggleDropdown,
      selectContinent,
    };
  },
};
</script>

<style scoped>
.continent-filter {
  margin-left: 1rem;
}

/* Enfoque en diseño responsivo */
@media (max-width: 768px) {
  .dropdown-menu {
    width: 100%;
  }

  .continent-filter {
    margin-left: 0.5rem;
  }
}

@media (min-width: 769px) {
  .dropdown-menu {
    width: 300px;
  }
}
</style>
