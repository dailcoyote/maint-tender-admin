import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VNavigation from "./components/Navigation/Navigation.vue";
import VFilter from "./components/Filter/Filter.vue";
import VDialog from "./components/Dialog/Dialog";

Vue.component('v-navigation', VNavigation);
Vue.component('v-filter', VFilter);
Vue.component('v-dialog', VDialog);


Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
