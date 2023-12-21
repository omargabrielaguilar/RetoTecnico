<template>
    <div v-if="country" class="country-card-sidebar">
      <div class="relative h-0" style="padding-bottom: 56.25%;">
        <img v-if="countryImage" :src="countryImage" alt="Country Image" class="absolute inset-0 w-full h-full object-cover mb-4" />
      </div>
      <h2 class="text-xl font-semibold">{{ country.name }}</h2>
      <p>{{ country.emoji }} | {{ country.continent.name }}</p>
      <button @click="closeCountryCard">Cerrar</button>
    </div>
  </template>
  
  
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps(["country"]);
const countryImage = ref("");

const fetchCountryImage = async () => {
    try {
        const response = await axios.get(
            `https://pixabay.com/api/?key=22474464-ecdf6812d94efec70cdcdddbf&q=${props.country.name}`
        );
        console.log("Pixabay Response:", response.data);
        const image = response.data.hits[0];
        if (image) {
            countryImage.value = image.webformatURL;
        }
    } catch (error) {
        console.error("Error fetching country image:", error);
    }
};

onMounted(() => {
    fetchCountryImage();
});
</script>
<style scoped>
.country-card-sidebar {
    width: 300px;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    /* Agrega aquí otros estilos según sea necesario */
}
</style>
  