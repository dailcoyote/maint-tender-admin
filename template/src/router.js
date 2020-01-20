import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

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
                requaresAuth: true,
                access: "ADMIN^SUPPLIERS"
            }
        },
        {
            path: "/suppliers/new",
            name: "new_supplier",
            component: () => import("./views/NewSupplier/NewSupplier.vue"),
            props: { default: true, action: "NEW", title: 'Добавить поставщика' },
            meta: {
                requaresAuth: true,
                access: "ADMIN^SUPPLIERS"
            }
        },
        {
            path: "/supplier/edit/:id",
            name: "edit_supplier",
            component: () => import("./views/NewSupplier/NewSupplier.vue"),
            props: { default: true, action: "UPDATE", title: 'Редактировать поставщика' },
            meta: {
                requaresAuth: true,
                access: "ADMIN^SUPPLIERS"
            }
        },
        {
            path: "/products",
            name: "products",
            component: () => import("./views/Products/Products.vue"),
            meta: {
                requaresAuth: true,
                access: "ADMIN^PRODUCTS"
            }
        },
        {
            path: "/users",
            name: "users",
            component: () => import("./views/Users/Users.vue"),
            meta: {
                requaresAuth: true,
                access: "ADMIN^USERS"
            }
        },
        {
            path: "/new_user",
            name: "new_user",
            component: () => import("./views/NewUser/NewUser.vue"),
            meta: {
                requaresAuth: true,
                access: "ADMIN^USERS"
            }
        },
        {
            path: "/settings",
            name: "settings",
            component: () => import("./views/Settings/Settings.vue"),
            meta: {
                requaresAuth: true,
                access: "ADMIN^USERS"
            }
        },
        {
            path: "/settings/add",
            name: "settings_add",
            component: () => import("./views/SettingsAdd/SettingsAdd.vue"),
            meta: {
                requaresAuth: true,
                access: "ADMIN^USERS"
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requaresAuth = to.matched.some(record => record.meta.requaresAuth);
    const access = to.meta.access;
    const currentUser = store.state.token;
    const isTimeOver = store.state.tokenEXP < Math.floor(new Date().getTime() / 1000);
    if (requaresAuth && !currentUser) {
        next("/login");
    } else if (requaresAuth && currentUser) {
        const user_access = store.state.user.adminControls;
        if (isTimeOver || user_access[0] == "NO_ACCESS") {
            next("/login");
        }else if(user_access[0] == "SUPER_ADMIN"){
            next();
        }else{
            if(user_access.includes(access)){
                next();
            }else{
                next(false);
            }
        }
    } else {
        next();
    }
});

export default router;