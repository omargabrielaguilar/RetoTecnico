<template>
    <main>
        <h2>HOLAAA :D, esta es la vista {{ $route.params.id }}</h2>

    </main>
</template>
  
<script>
export default {
    // Puedes agregar lógica específica del componente aquí
};
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap');

main {
    background-color: rgb(111, 199, 199);
}

h2 {
    font-family: 'Raleway', sans-serif;
    padding: 1rem 3rem;
}
</style>
  