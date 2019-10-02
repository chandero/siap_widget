import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import locale from "iview/dist/locale/es-ES";
import "iview/dist/styles/iview.css";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(iView, { locale });
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App)
}).$mount("#app");
