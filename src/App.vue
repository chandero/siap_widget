<template>
  <div id="app">
    <!-- <Reporte :codigo="codigo"></Reporte> -->
    <ReporteUnificado></ReporteUnificado>
  </div>
</template>

<script>
/* import Reporte from "./components/Reporte.vue"; */
import ReporteUnificado from './components/ReporteUnificado.vue';

export default {
  name: 'app',
  components: {
    /* Reporte, */
    ReporteUnificado,
  },
  data() {
    return {
      codigo: null,
    };
  },
  /* mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    this.codigo = urlParams.get('codigo');
    console.log('consec: ' + this.codigo);
  }, */
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
