<!-- En el archivo Sidebar.vue -->
<template>
    <div class="sidebar">
        <div class="logo">
            <img src="/logo.png" alt="logo" class="logo-image" />
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
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap');

.sidebar {
    width: 20vw;
    height: 100vh;
    background-color: #676767;
    padding: 10px;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
}

.logo {
    display: flex;
    margin-bottom: 2em;
    justify-content: center;
}

.logo-image {
    width: 60%;
}

ul {
    list-style-type: none;
    padding: 0; /* Asegúrate de que no haya relleno */
    margin: 0; /* Asegúrate de que no haya margen */
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

li {
    font-size: 1.4rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-bottom: none;
    padding: 8px 20px; 
    
}

li:hover {
    background-color: white;
    color: #676767;
}</style>