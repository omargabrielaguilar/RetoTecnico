<template>
  <div class="home-container">
    <SearchCountry
      :countries="countries"
      :updateSearchTerm="updateSearchTerm"
      :updateSelectedContinent="updateSelectedContinent"
      @select-country="openCountryCard"
      @input-click="handleInputClick"
    />

    <div v-if="loading">Cargando...</div>
    <div v-else class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      <CountryListCard
        v-for="country in displayList"
        :key="country.code"
        :country="country"
        @click="openCountryCard(country)"
      />
      <CountryCard
        v-if="selectedCountryDetails"
        :country="selectedCountryDetails"
        @close="closeCountryCard"
      />
    </div>
    <ContinentFilter
      v-if="showContinentFilter"
      :continents="continents"
      :updateSelectedContinent="updateSelectedContinent"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CountryListCard from "@/components/CountryListCard.vue";
import CountryCard from "@/components/CountryCard.vue";
import SearchCountry from "@/components/SearchCountry.vue";
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
    SearchCountry,
  },
  setup() {
    const countries = ref([]);
    const selectedCountryDetails = ref(null);
    const searchTerm = ref("");
    const selectedContinent = ref("");

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

    const updateSelectedContinent = (continent) => {
      selectedContinent.value = continent;
    };

    const displayList = computed(() => {
      const filteredCountriesSet = new Set(
        searchTerm.value
          ? countries.value.filter((country) =>
            country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
          )
          : countries.value
      );

      const filteredByContinent = selectedContinent.value
        ? Array.from(filteredCountriesSet).filter(
          (country) => country.continent.name === selectedContinent.value
        )
        : Array.from(filteredCountriesSet);

      return filteredByContinent;
    });

    const updateSearchTerm = (term) => {
      searchTerm.value = term;
    };

    onUnmounted(() => {
      selectedCountryDetails.value = null;
      updateSearchTerm(""); 
    });

    return {
      countries,
      loading,
      selectedCountryDetails,
      openCountryCard,
      closeCountryCard,
      searchTerm,
      updateSearchTerm,
      displayList,
      selectedContinent,
      updateSelectedContinent,
    };
  },
};

</script>

<style scoped>
.home-container {
  margin-left: 20vw;
}

@media (max-width: 768px) {
  .home-container {
    margin-left: 0;
  }
}
</style>