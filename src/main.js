import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  undefined,
  vuetify,
  render: h => h(App)
}).$mount("#app");
