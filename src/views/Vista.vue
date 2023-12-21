<template>
  <div class="vista-container">
    <main>
      <!--ESTO ES MÁS QUE TODO PARA MOSTRAR EL ENRUTAMIENTO QUE HICE TANTO CON SIDEBAR Y COMO AL DAR CLICK A VISTA 1 , SE IMPRIMIRA EN H1 EL NÚMERO DE VISTA-->
      <h1>HOLAAA :D, esta es la vista {{ $route.params.id }}</h1>
    </main>
  </div>
</template>
  
<script>
export default {
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap');

.vista-container {
  margin-left: 20vw;
}

h1 {
  font-family: 'Raleway', sans-serif;
  padding: 1.5rem 3rem;
  font-size: 30px;
  font-weight: 700;
  color: #676767;
}
</style>
  