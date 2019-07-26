import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VNavigation from "./components/Navigation/Navigation.vue";

Vue.component('v-navigation', VNavigation);


Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
