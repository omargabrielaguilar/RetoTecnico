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
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CountryListCard from "@/components/CountryListCard.vue";
import '@/main.css';

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
    const { result, loading, error } = useQuery(COUNTRIES_QUERY);

    // ... (resto del código)

    return {
      countries: result.value?.countries || [],
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
