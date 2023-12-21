<template>
    <div class="country-card-sidebar">
        <div class="image-container">
            <img v-if="countryImage" :src="countryImage" alt="Country Image" class="country-image" />
        </div>
        <div class="content">
            <div class="header">
                <p class="flag">{{ country.emoji }}</p>
                <div class="country-continent">
                    <h2 class="country-name">{{ country.name }}</h2>
                    <p class="continent">{{ country.continent.name }}</p>
                </div>
            </div>
            <div class="details">
                <p class="capital"><strong class="strong-title">Capital:</strong> {{ country.capital }}</p>
                <p class="language"><strong class="strong-title">Lenguaje:</strong> {{ country.languages ?
                    country.languages.map(lang =>
                        lang.name).join(', ') : 'N/A' }}</p>
                <p class="currency"><strong class="strong-title">Moneda:</strong> {{ country.currency }}</p>
                <div v-if="country.states && country.states.length > 0" class="states">
                    <p class="state-title"> <strong class="strong-title">Estados:</strong></p>
                    <ul class="state-list">
                        <li v-for="state in country.states" :key="state.code">{{ state.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <button class="close-button" @click="closeCountryCard">X</button>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import axios from "axios";

const countryImage = ref("");

const props = defineProps(["country"]);
const emit = defineEmits();

const closeCountryCard = () => {
    emit("close");
}

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
</script>
  
<style scoped>
/* Media query para pantallas más pequeñas (p. ej., dispositivos móviles) */


.country-card-sidebar {
    width: 22vw;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}



.image-container {
    width: 100%;
    height: 200px;
    /* Ajusta según sea necesario */
    overflow: hidden;
    border-radius: 15px;
}

.country-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    margin-bottom: 10px;
    gap: 1rem;
    align-items: center;
}

.country-name {
    color: #319de2;
    font-weight: 900;
    align-items: center;
    font-size: 1.5rem;
}

.flag {
    font-size: 2rem;
}

.continent {
    color: #676767;
    /* Gris */
}

.details {
    text-align: left;
}

.details p {
    color: #676767;
    /* Azul */
}

.states {
    max-height: 180px;
    overflow-y: auto;
}

.state-title {
    color: #3498db;
    /* Azul */
    font-size: 1rem;
}

.state-list {
    margin-top: 1rem;
    padding-left: 20px;
}

.close-button {
    margin-top: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.strong-title {
    color: #319de2;
}


@media (max-width: 768px) {
    .country-card-sidebar {
        width: 100%;
        max-width: none;
        /* Elimina el límite máximo en pantallas pequeñas */
    }

    .states {
        /* Cambia esto a 100% para que se ajuste al contenido */
        overflow-y: auto;
    }
}
</style>
  