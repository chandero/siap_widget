<template>
  <div class="container">
    <h1 class="title">Reporte de fallos</h1>

    <br />
    <div class="button-container">
      <el-button
        class="button-color"
        @click="
          {
            isOption1 = !isOption1;
            isOption2 = false;
            codigo = null;
          }
        "
        >Quiero reportar un fallo, pero desconozco los datos de la
        luminaría.</el-button
      >

      <el-button
        class="button-color"
        @click="
          {
            isOption2 = !isOption2;
            isOption1 = false;
          }
        "
        >Quiero reportar una luminaria buscándola en el mapa.</el-button
      >
    </div>

    <Reporte :codigo="codigo" v-if="isOption1"></Reporte>
    <travel-map @reportar="handleReport" v-if="isOption2"></travel-map>
  </div>
</template>

<script>
import Reporte from './Reporte.vue';
import TravelMap from './TravelMap.vue';
export default {
  components: {
    Reporte,
    TravelMap,
  },
  data() {
    return {
      codigo: null,
      isOption1: false,
      isOption2: false,
    };
  },
  methods: {
    handleReport(value) {
      this.codigo = value;
      this.isOption2 = false;
      this.isOption1 = true;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.title {
  text-align: center;
}

.button-container {
  text-align: center;
  margin-bottom: 20px;
}

.button-color {
  background-color: #e0a800;
  color: black;
  border-color: #e0a800;
}
.button-color:hover {
  background-color: #cc9c0d;
  color: black;
  border-color: #cc9c0d;
}
</style>
