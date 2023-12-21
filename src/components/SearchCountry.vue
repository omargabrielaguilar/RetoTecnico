<template>
  <div class="search-country mt-8 mb-4 relative">
    <div class="search-country-bar flex flex-col items-center ">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="País..."
        class="w-full py-3 px-4 border rounded-l-lg focus:outline-none focus:border-blue-500 mb-2"
        @input="handleInput"
        @click="showContinentFilter"
      />
      <ContinentFilter
        v-if="showContinentFilter"
        :continents="continents"
        :updateSelectedContinent="updateSelectedContinent"
      />
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
    placeholder: String,
    countries: Array,
    onSelectCountry: Function,
    updateSearchTerm: Function,
    updateSelectedContinent: Function,
  },
  setup(props, { emit }) {
    const searchTerm = ref("");
    const continents = computed(() => {
      const uniqueContinents = new Set(
        props.countries.map((country) => country.continent.name)
      );
      return Array.from(uniqueContinents);
    });

    const showContinentFilter = ref(false);

    const handleInput = () => {
      props.onSelectCountry(null);
      props.updateSearchTerm(searchTerm.value);
      showContinentFilter.value = true;
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

    // Emitir evento al montar el componente para que Home pueda escucharlo
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
.search-country {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Alinea verticalmente en el centro */
    align-items: center;
  }
  .search-country-bar{
    width: 70%;
    border-radius: 2rem;
  }
  .search-country input {
    width: 100%;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .search-country-bar{
    width: 90%;
    border-radius: 2rem;
  }
  }
</style>