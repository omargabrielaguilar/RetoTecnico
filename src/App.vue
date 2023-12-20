<template>
  <div id="app">
    <Sidebar />
    <router-view  class="content"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  width: 100%;
}

.content {
  flex-grow: 1;
  overflow: auto; 
}

</style>
