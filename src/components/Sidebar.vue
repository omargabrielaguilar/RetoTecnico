<!-- En el archivo Sidebar.vue -->
<template>
    <div class="sidebar">
        <div class="logo">
            <img src="../../public/logo.png" alt="logo" class="logo" />
        </div>
        <ul>
            <li @click="navigateToHome">Home</li>
            <li @click="navigateToView(1)">Vista 1</li>
            <li @click="navigateToView(2)">Vista 2</li>
        </ul>
    </div>
</template>
  
<script>
export default {
    methods: {
        navigateToHome() {
            // Lógica para navegar a la página de inicio
            console.log('Navegar a la página de inicio');
        },
        navigateToView(viewNumber) {
            // Lógica para navegar a Vista 1 o Vista 2 según el parámetro viewNumber
            console.log(`Navegar a Vista ${viewNumber}`);
        },
    }
};
</script>
  
<style scoped>
.sidebar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 10px;
}

.logo {
    text-align: center;
    margin-bottom: 20px;
}

.logo-image {
    width: 50%;
    /* Ajusta el ancho según sea necesario */
    max-width: 120px;
    /* Evita que la imagen sea demasiado grande */
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    cursor: pointer;
    padding: 8px;
    border-bottom: none;
}

li:hover {
    background-color: white;
}
</style>
  