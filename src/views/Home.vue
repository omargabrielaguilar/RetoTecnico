<template>
  <div class="home-container">
    <div v-if="loading">Cargando...</div>
    <div v-else class="grid grid-cols-3 gap-1">
      <CountryListCard v-for="country in countries" :key="country.code" :country="country" class="col-span-1"
        @click="openCountryCard(country)" />
      <CountryCard v-if="selectedCountryDetails" :country="selectedCountryDetails" @close="closeCountryCard" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CountryListCard from "@/components/CountryListCard.vue";
import CountryCard from "@/components/CountryCard.vue";
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
    capital
    languages {
      name
    }
    currency
    states {
      code
      name
    }
  }
}
`;

export default {
  components: {
    CountryListCard,
    CountryCard,
  },
  setup() {
    const countries = ref([]);
    const selectedCountryDetails = ref(null);
    const { loading, onResult } = useQuery(COUNTRIES_QUERY);

    onMounted(() => {
      onResult((result) => {
        if (result.data && result.data.countries) {
          countries.value = result.data.countries;
        }
      });
    });

    const openCountryCard = (country) => {
      console.log("Selected Country:", country);
      selectedCountryDetails.value = country;
    };

    const closeCountryCard = () => {
      selectedCountryDetails.value = null;
    };

    // Limpiamos la selección al salir del componente
    onUnmounted(() => {
      selectedCountryDetails.value = null;
    });

    return {
      countries,
      loading,
      selectedCountryDetails,
      openCountryCard,
      closeCountryCard,
    };
  },
};
</script>

<style scoped>
.home-container {
  margin-left: 20vw;
  /* Ajusta este valor según el ancho del Sidebar */
}
</style>
