<template>
  <div class="search-country mt-8 mb-4 relative">
    <!-- Barra de búsqueda y filtro de continentes -->
    <div class="search-country-bar flex flex-col items-center">
      <!-- Input de búsqueda -->
      <input v-model="searchTerm" type="text" :placeholder="placeholder ? placeholder : 'País...'"
        class="w-full py-3 px-4 border rounded-l-lg focus:outline-none focus:border-blue-500 mb-2" @input="handleInput"
        @click="showContinentFilter" />
      <!-- Componente de filtro de continentes -->
      <ContinentFilter v-if="showContinentFilter" :continents="continents"
        :updateSelectedContinent="updateSelectedContinent" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import ContinentFilter from "@/components/ContinentFilter.vue";

export default {
  components: {
    ContinentFilter,
  },
  props: {
    placeholder: String, // define el texto de marcador de posición
    countries: Array,
    onSelectCountry: Function, // Función para manejar la selección de un país
    updateSearchTerm: Function, // Función para actualizar el término de búsqueda
    updateSelectedContinent: Function, // Función para actualizar el continente seleccionado
  },
  setup(props, { emit }) {
    const searchTerm = ref("");
    const continents = computed(() => {
      // Cálculo de continentes únicos a partir de la lista de países
      const uniqueContinents = new Set(
        props.countries.map((country) => country.continent.name)
      );
      return Array.from(uniqueContinents);
    });

    const showContinentFilter = ref(false); // Estado para mostrar/ocultar el filtro de continentes

    // Maneja el evento de entrada en el input de búsqueda
    const handleInput = () => {
      props.onSelectCountry(null); // Reinicia la selección de país al escribir en el input
      props.updateSearchTerm(searchTerm.value);
      showContinentFilter.value = true;
    };

    // Maneja la selección de un continente en el filtro
    const handleContinentSelect = (continent) => {
      console.log("Selected Continent in SearchCountry:", continent);
      props.updateSelectedContinent(continent);
    };


    watch(
      () => searchTerm.value,
      (newVal, oldVal) => {
        if (!newVal && oldVal) {
          props.onSelectCountry(null); // Reinicia la selección de país si el término de búsqueda está vacío
        }
      }
    );

    // Emitir evento al montar el componente
    onMounted(() => {
      emit("input-click", true);
    });

    return {
      searchTerm,
      handleInput,
      continents,
      handleContinentSelect,
      showContinentFilter,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para el componente de búsqueda, he usado tanto tailwind como css nativo*/
.search-country {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-country-bar {
  width: 70%;
  border-radius: 2rem;
}

.search-country input {
  width: 100%;
  border-radius: 1rem;
}

/* Estilos específicos para pantallas pequeñas */
@media (max-width: 768px) {
  .search-country-bar {
    width: 90%;
    border-radius: 2rem;
  }
}
</style>
