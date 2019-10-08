<template>
  <div id="app">
    <Reporte></Reporte>
  </div>
</template>

<script>
import Reporte from "./components/Reporte.vue";

export default {
  name: "app",
  components: {
    Reporte
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
