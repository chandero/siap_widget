<template>
  <div id="app">
    <Reporte></Reporte>
    <Consulta></Consulta>
  </div>
</template>

<script>
import Reporte from "./components/Reporte.vue";
import Consulta from "./components/Consulta.vue";

export default {
  name: "app",
  components: {
    Reporte,
    Consulta
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
