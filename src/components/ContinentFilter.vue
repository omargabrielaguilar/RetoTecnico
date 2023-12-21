<template>
  <div class="continent-filter">
    <select v-model="selectedContinent" @change="handleContinentChange">
      <option value="">Todos los continentes</option>
      <option v-for="continent in continents" :key="continent" :value="continent">
        {{ continent }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    continents: Array,
    updateSelectedContinent: Function,
  },
  setup(props) {
    const selectedContinent = ref("");

    const handleContinentChange = () => {
      console.log("Selected Continent in ContinentFilter:", selectedContinent.value);
      props.updateSelectedContinent(selectedContinent.value);
    };

    // Limpiar la selección del continente cuando se limpia el término de búsqueda
    watch(
      () => selectedContinent.value,
      (newVal, oldVal) => {
        if (!newVal && oldVal) {
          props.updateSelectedContinent(null);
        }
      }
    );

    return {
      selectedContinent,
      handleContinentChange,
    };
  },
};
</script>

<style scoped>
/* Estilos para el componente de filtrado por continente aquí */
</style>
