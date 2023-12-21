<template>
  <div class="search-country flex items-center justify-center mt-8 mb-4">
    <input v-model="searchTerm" type="text" placeholder="País..."
      class="w-96 py-3 px-4 border rounded-l-lg focus:outline-none focus:border-blue-500" @input="handleInput" />
    <ContinentFilter :continents="continents" :updateSelectedContinent="updateSelectedContinent"  />

    <button class="bg-blue-500 text-white py-3 px-4 rounded-r-md" @click="handleSearch">
      Buscar
    </button>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import ContinentFilter from "@/components/ContinentFilter.vue";

export default {
  components: {
    ContinentFilter,
  },
  props: {
    placeholder: String,
    countries: Array,
    onSelectCountry: Function,
    updateSearchTerm: Function,
    updateSelectedContinent: Function,
  },
  setup(props) {
    const searchTerm = ref("");
    const continents = computed(() => {
      const uniqueContinents = new Set(
        props.countries.map((country) => country.continent.name)
      );
      return Array.from(uniqueContinents);
    });

    const handleInput = () => {
      props.onSelectCountry(null);
      props.updateSearchTerm(searchTerm.value);
    };

    const handleSearch = () => {
      props.updateSearchTerm(searchTerm.value);
    };

    const handleContinentSelect = (continent) => {
      console.log("Selected Continent in SearchCountry:", continent);
      props.updateSelectedContinent(continent);
    };

    watch(
      () => searchTerm.value,
      (newVal, oldVal) => {
        if (!newVal && oldVal) {
          props.onSelectCountry(null);
        }
      }
    );

    return {
      searchTerm,
      handleInput,
      handleSearch,
      continents,
      handleContinentSelect,
    };
  },
};
</script>

<style scoped>
/* Estilos del componente de búsqueda aquí */
/* Puedes agregar estilos adicionales según tus necesidades */
</style>
