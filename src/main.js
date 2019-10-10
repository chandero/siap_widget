import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import locale from "iview/dist/locale/es-ES";
import "iview/dist/styles/iview.css";
import axios from "axios";
import VueAxios from "vue-axios";
import onlyInt from "vue-input-only-number";

Vue.config.productionTip = false;

Vue.use(iView, { locale });
Vue.use(VueAxios, axios);
Vue.use(onlyInt);

new Vue({
  render: h => h(App)
}).$mount("#app");
