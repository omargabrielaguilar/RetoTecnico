<template>
  <div class="country-card">
    <div class="relative h-0" style="padding-bottom: 56.25%;">
      <img :src="countryImage" alt="Country Image" class="absolute inset-0 w-full h-full object-cover" />
    </div>
    <div class="flex flex-col h-full p-2 bg-white">
      <div class="flex items-center mb-2"> <!-- Contenedor para el emoji y nombre del país -->
        <p class="text-xl mr-2">{{ country.emoji }}</p>
        <div>
          <h3 class="text-base font-semibold">{{ country.name }}</h3>
          <span class="text-xs">{{ country.continent.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  props: {
    country: Object,
  },
  setup(props) {
    const countryImage = ref("");

    const fetchCountryImage = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=22474464-ecdf6812d94efec70cdcdddbf&q=${props.country.name}`
        );
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

    return {
      countryImage,
    };
  },
};
</script>

<style scoped>
.country-card {
  border: 1px solid #ccc;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
