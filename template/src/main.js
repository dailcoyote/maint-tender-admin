import Vue from "vue";
import VueSweetalert2 from 'vue-sweetalert2';
import Loading from "vue-loading-overlay";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VNavigation from "./components/Navigation/Navigation.vue";
import VFilter from "./components/Filter/Filter.vue";
import VDialog from "./components/Dialog/Dialog";
import VTable from "./components/Table/Table";

Vue.component('v-navigation', VNavigation);
Vue.component('v-filter', VFilter);
Vue.component('v-dialog', VDialog);
Vue.component('v-table', VTable);
Vue.use(VueSweetalert2, {
	confirmButtonColor: '#42A5F5',
	cancelButtonColor: '#ff7674'
});
Vue.use(Loading, {
	color: '#42A5F5'
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
