import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import locale from "iview/dist/locale/es-ES";
import "iview/dist/styles/iview.css";
import axios from "axios";
import VueAxios from "vue-axios";
import onlyInt from "vue-input-only-number";
import moment from "moment";
import VueRouter from "vue-router";
import Vuex from "vuex";

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY/MM/DD HH:mm:ss");
  }
});

Vue.config.productionTip = false;

Vue.use(iView, { locale });
Vue.use(VueAxios, axios);
Vue.use(onlyInt);

const store = new Vuex.Store({
  state: {
    // url: "http://localhost:9091"
    url: "http://siap.iluminacionsanjuangiron.com"
  },
  getters: {
    url: state => {
      return state.url;
    }
  }
});

new Vue({
  store: store,
  render: h => h(App)
}).$mount("#app");
