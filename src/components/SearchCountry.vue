<template>
    <div class="search-country flex items-center justify-center mt-8 mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="País..."
        class="w-96 py-3 px-4 border rounded-l-lg focus:outline-none focus:border-blue-500"
        @input="handleInput"
      />
      <button
        class="bg-blue-500 text-white py-3 px-4 rounded-r-md"
        @click="handleSearch"
      >
        Buscar
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from "vue";
  import CountryListCard from "@/components/CountryListCard.vue";
  
  export default {
    components: {
      CountryListCard,
    },
    props: {
      placeholder: String,
      countries: Array,
      onSelectCountry: Function,
      updateSearchTerm: Function,
    },
    setup(props) {
      const searchTerm = ref("");
  
      const filteredCountries = computed(() => {
        return (
          props.countries &&
          props.countries.filter((country) =>
            country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
          )
        );
      });
  
      const handleInput = () => {
        props.onSelectCountry(null);
        props.updateSearchTerm(searchTerm.value);
      };
  
      const handleSearch = () => {
        // Puedes realizar acciones adicionales al hacer clic en el botón de búsqueda si es necesario
        // Por ahora, simplemente actualiza el término de búsqueda
        props.updateSearchTerm(searchTerm.value);
      };
  
      // Limpiar el término de búsqueda cuando se cierra la tarjeta del país
      watch(
        () => searchTerm.value,
        (newVal, oldVal) => {
          if (!newVal && oldVal) {
            // Si se borra el término de búsqueda, restablecer la lista completa
            props.onSelectCountry(null);
          }
        }
      );
  
      return {
        searchTerm,
        filteredCountries,
        handleInput,
        handleSearch,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos del componente de búsqueda aquí */
  /* Puedes agregar estilos adicionales según tus necesidades */
  </style>
  