<template>
  <div class="relative inline-block">
    <div class="continent-filter flex items-center space-x-2 cursor-pointer" @click="toggleDropdown">
      <span>{{ selectedContinent ? selectedContinent : 'Todos los continentes' }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>

    <div v-if="dropdownOpen"
      class="dropdown-menu absolute mt-2 bg-white border rounded-md shadow-lg overflow-hidden z-10"
      style="top: 100%; left: 0; max-width: 80vw;">

      <!-- Utiliza un solo contenedor en lugar de un grid en pantallas pequeñas -->
      <div class="sm:grid sm:grid-cols-3 sm:gap-2 p-2">
        <div @click="selectContinent('')" class="text-center cursor-pointer">
          <span class="text-sm">?</span>
        </div>
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
    continents: Array,
    updateSelectedContinent: Function,
  },
  setup(props) {
    const selectedContinent = ref("");
    const dropdownOpen = ref(false);

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

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

/* Estilos específicos para pantallas pequeñas */
@media (max-width: 768px) {
  .dropdown-menu {
    width: 100%;
  }

  .continent-filter {
    margin-left: 0.5rem;
  }
}

/* Estilos específicos para pantallas medianas y grandes */
@media (min-width: 769px) {
  .dropdown-menu {
    width: 300px; /* Puedes ajustar el tamaño según tus necesidades */
  }
}
</style>