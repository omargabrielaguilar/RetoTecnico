<template>
  <div class="search-country flex items-center justify-center mt-8 mb-4 relative">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="País..."
      class="w-96 py-3 px-4 border rounded-l-lg focus:outline-none focus:border-blue-500"
      @input="handleInput"
      @click="showContinentFilter"
    />
    <ContinentFilter
      v-if="showContinentFilter"
      :continents="continents"
      :updateSelectedContinent="updateSelectedContinent"
    />
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
/* Estilos del componente de búsqueda aquí */
/* Puedes agregar estilos adicionales según tus necesidades */
</style>
