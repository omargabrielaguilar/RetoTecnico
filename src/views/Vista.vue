<template>
    <main>
        <h1>HOLAAA :D, esta es la vista {{ $route.params.id }}</h1>

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
    background-color: #e3f4ff;
}

h1 {
    font-family: 'Raleway', sans-serif;
    padding: 1.5rem 3rem;
    font-size: 30px;
    font-weight: 700;
    color: #676767;
}
</style>
  