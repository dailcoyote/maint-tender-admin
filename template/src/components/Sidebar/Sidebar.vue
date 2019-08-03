<template>
    <div 
        class="sidebar">
        <div 
            class="sidebar_background" 
            @click="close">
        </div>
        <div class="sidebar_content">
            <div class="sidebar_close-button">
                <h1>Меню</h1>
                <img 
                    src="@/assets/close.svg" 
                    alt="close"
                    @click="close">
            </div>
            <div class="sidebar_content-links">
                <router-link
                    class="sidebar_content-link"
                    v-for="(item, i) in filterLinks"
                    :key="i"
                    :to="item.link">
                    {{item.title}}
                </router-link>
            </div>
            <div 
                class="sidebar_content-logout"
                @click="logout">
                Выйти
                <i class="material-icons">
                    input
                </i>
            </div>
        </div>
    </div>
</template>
<script>
import "./sidebar.scss"
import { mapState } from "vuex"
export default {
    data(){
        return{
            menu_links: [
                {
                    title: "Поставщики",
                    link: "suppliers",
                    access: "ADMIN^SUPPLIERS"
                },
                {
                    title: "Товары",
                    link: "products",
                    access: "ADMIN^PRODUCTS"
                },
                {
                    title: "Сотрудники",
                    link: "managers",
                    access: "ADMIN^USERS"
                },
                {
                    title: "История",
                    link: "history",
                    access: "ADMIN^USERS"
                },
            ],
        }
    },
    computed: {
        ...mapState(['user']),
        filterLinks(){
            if(!this.user) {
                return [];
            }else if(this.user.adminControls[0] == "SUPER_ADMIN"){
                return this.menu_links;
            }else{
                return this.menu_links.filter(el => {
                    return this.user.adminControls.includes(el.access)
                });
            }
        }
    },
    methods: {
        close(){
            this.$emit('close');
        },
        logout(){
            this.$store.commit('logout');
            this.$router.push('/login');
        },
    }
}
</script>
