<template>
    <div class="search-country">
      <input v-model="searchTerm" type="text" placeholder="Buscar país..." @input="handleSearch" />
      <div v-if="searchTerm" class="search-results">
        <CountryListCard
          v-for="country in filteredCountries"
          :key="country.code"
          :country="country"
          @click="selectCountry(country)"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from "vue";
  import { useQuery } from "@vue/apollo-composable";
  import gql from "graphql-tag";
  import CountryListCard from "@/components/CountryListCard.vue";
  
  const COUNTRIES_QUERY = gql`
    query {
      countries {
        code
        name
      }
    }
  `;
  
  export default {
    components: {
      CountryListCard,
    },
    setup(props, { emit }) {
      const searchTerm = ref("");
      const countries = ref([]);
      const { onResult } = useQuery(COUNTRIES_QUERY);
  
      onMounted(() => {
        onResult((result) => {
          if (result.data && result.data.countries) {
            countries.value = result.data.countries;
          }
        });
      });
  
      const filteredCountries = computed(() => {
        return countries.value.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
  
      const handleSearch = () => {
        // No es necesario implementar lógica aquí, ya que la reactividad se encarga del filtrado
      };
  
      const selectCountry = (country) => {
        emit("select-country", country);
        searchTerm.value = ""; // Limpia el término de búsqueda después de seleccionar un país
      };
  
      return {
        searchTerm,
        filteredCountries,
        handleSearch,
        selectCountry,
      };
    },
  };
  </script>
  
  <style scoped>
  .search-country {
    margin-bottom: 20px;
  }
  
  .search-results {
    position: absolute;
    z-index: 1;
    background-color: white;
    width: 100%;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
  }
  
  li:hover {
    background-color: #f0f0f0;
  }
  </style>
  