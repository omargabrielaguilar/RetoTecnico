<template>
  <div class="home-container">
    <div v-if="loading">Cargando...</div>
    <div v-else class="grid grid-cols-3 gap-1">
      <CountryListCard
        v-for="country in countries"
        :key="country.code"
        :country="country"
        class="col-span-1"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CountryListCard from "@/components/CountryListCard.vue";
import "@/main.css";

const COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      continent {
        name
      }
      emoji
    }
  }
`;

export default {
  components: {
    CountryListCard,
  },
  setup() {
    // Inicializamos countries como ref con un array vacío por defecto
    const countries = ref([]);

    const { loading, error, onResult } = useQuery(COUNTRIES_QUERY);

    onMounted(() => {
      // Actualizar la referencia countries cuando la consulta se completa
      onResult((result) => {
        // Verificamos si result.data y result.data.countries están definidos
        if (result.data && result.data.countries) {
          countries.value = result.data.countries;
        }
      });
    });

    return {
      countries,
      loading,
    };
  },
};
</script>

<style scoped>
.home-container {
  margin-left: 20vw; /* Ajusta este valor según el ancho del Sidebar */
}
</style>
