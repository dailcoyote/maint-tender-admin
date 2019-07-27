import Vue from "vue";
import Router from "vue-router";
// import store from '@/store';


Vue.use(Router);

const router = new Router({
	routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("./views/Login/Login.vue")
        },
        {
            path: "/",
            redirect: "/suppliers",
        },
        {
            path: "/suppliers",
            name: "suppliers",
            component: () => import("./views/Suppliers/Suppliers.vue"),
            meta: {
                requaresAuth: true
            }
        },
        {
            path: "/new_supplier",
            name: "new_supplier",
            component: () => import("./views/NewSupplier/NewSupplier.vue"),
            meta: {
                requaresAuth: true
            }
        }
    ]
});



// router.beforeEach((to, from, next) => {
//     const requaresAuth = to.matched.some(record => record.meta.requaresAuth);
//     const currentUser = store.state.token;
//     const isTimeOver =
//         store.state.tokenEXP < Math.floor(new Date().getTime() / 1000);
//     if (requaresAuth && !currentUser) {
//         next("/login");
//     } else if (requaresAuth && currentUser) {
//         if (isTimeOver) {
//             next("/login");
//         }
//         next();
//     } else {
//         next();
//     }
// });



export default router;