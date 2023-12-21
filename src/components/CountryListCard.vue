<template>
  <div class="country-card" :class="{ filtered: filtered }" @click="$emit('click', country)">
    <div class="relative h-0" style="padding-bottom: 56.25%;">
      <img :src="countryImage" alt="Country Image"
        class="absolute inset-0 w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl" />
    </div>
    <div class="flex flex-col h-full p-2 bg-white rounded-bl-2xl rounded-br-2xl shadow-md">
      <div class="flex items-center mb-2">
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
    country: Object, // Propiedad que recibe datos del objeto country
  },
  setup(props) {
    const countryImage = ref(""); // Variable para almacenar la URL de la imagen del país

    const fetchCountryImage = async () => {
      try {
        // use pixabay para usar imagenes que nos traiga a partir de la doc de la api que brinda
        const response = await axios.get(
          `https://pixabay.com/api/?key=22474464-ecdf6812d94efec70cdcdddbf&q=${props.country.name}`
        );
        const image = response.data.hits[0];
        if (image) {
          countryImage.value = image.webformatURL; // Asigna la URL de la imagen a la variable reactiva
        }
      } catch (error) {
        console.error("Error fetching country image:", error);
      }
    };

    // Ejecutar la función de carga de imagen al montar el componente
    onMounted(() => {
      fetchCountryImage();
    });

    return {
      countryImage, // Retornar la variable reactiva para que se pueda utilizar en el template
    };
  },
};
</script>

<style scoped>
.country-card {
  margin: 15px;
  border-radius: 2rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.country-card img {
  border-radius: 2xl 2xl 0 0;
}
</style>

