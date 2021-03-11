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
  },
  data() {
    return {
      repo_consecutivo: null
    };
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    console.log("consec: " + urlParams.get("id"));
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
