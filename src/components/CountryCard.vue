<template>
    <!-- Componente de tarjeta de país para la barra lateral -->
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
            <!-- Detalles del país: capital, idioma, moneda y estados si aplican -->
            <div class="details">
                <p class="capital"><strong class="strong-title">Capital:</strong> {{ country.capital }}</p>
                <p class="language"><strong class="strong-title">Lenguaje:</strong> {{ country.languages ?
                    country.languages.map(lang => lang.name).join(', ') : 'N/A' }}</p>
                <p class="currency"><strong class="strong-title">Moneda:</strong> {{ country.currency }}</p>
                <!-- Lista de estados si aplican -->
                <div v-if="country.states && country.states.length > 0" class="states">
                    <p class="state-title"> <strong class="strong-title">Estados:</strong></p>
                    <ul class="state-list">
                        <li v-for="state in country.states" :key="state.code">{{ state.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Botón de cierre -->
        <button class="close-button" @click="closeCountryCard">X</button>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import axios from "axios";

const countryImage = ref("");

const props = defineProps(["country"]);
const emit = defineEmits();

// Función para cerrar la tarjeta de país
const closeCountryCard = () => {
    emit("close");
};

// Función para obtener la imagen del país desde Pixabay
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

// Se ejecuta al montar el componente
onMounted(() => {
    fetchCountryImage();
});
</script>
  
<style scoped>
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
    overflow: hidden;
    border-radius: 15px;
}

.country-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Estilos para el encabezado con bandera, nombre del país y continente */
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
}

.details {
    text-align: left;
}

/* Estilos para los detalles específicos del país */
.details p {
    color: #676767;
}

.states {
    max-height: 180px;
    overflow-y: auto;
}

.state-title {
    color: #3498db;
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

/* Estilos específicos para pantallas pequeñas */
@media (max-width: 768px) {
    .country-card-sidebar {
        width: 100%;
        max-width: none;
    }

    /* Ajuste de estilos para la sección de estados en pantallas pequeñas */
    .states {
        overflow-y: auto;
    }
}
</style>
  