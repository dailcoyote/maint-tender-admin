<template>
    <div class="navigation">
        <div class="navigation-toolbar">
            <div class="navigation-toolbar_title">
                <div 
                    class="navigation-toolbar_button" 
                    @click="sidebar = true">
                    <i class="material-icons">
                        sort
                    </i>
                </div>
                <h1>
                    <i 
                        v-if="allowBack"
                        class="material-icons"
                        @click="$router.go(-1)">
                        arrow_back_ios
                    </i>
                    {{name}}
                </h1>
            </div>
            <div class="navigation-toolbar_actions">
                <slot name="actions"></slot>
            </div>
        </div>
        <transition name="open_sidebar">
            <div 
                class="navigation-sidebar" 
                v-if="sidebar">
                <div 
                    class="navigation-sidebar_background" 
                    @click="sidebar = false">
                </div>
                <div class="navigation-sidebar_content">
                    <div class="navigation-sidebar_close-button">
                        <h1>Меню</h1>
                        <img 
                            src="@/assets/close.svg" 
                            alt="close"
                            @click="sidebar = false">
                    </div>
                    <div class="navigation-sidebar_content-links">
                        <router-link
                            class="navigation-sidebar_content-link"
                            v-for="(item, i) in menu_links"
                            :key="i"
                            :to="item.link">
                            {{item.title}}
                        </router-link>
                    </div>
                    <div class="navigation-sidebar_content-logout">
                        Выйти
                        <i class="material-icons">
                            input
                        </i>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import "./navigation.scss"
export default {
    props: {
        name: String,
        allowBack: Boolean
    },
    data(){
        return{
            sidebar: false,
            menu_links: [
                {
                    title: "Поставщики",
                    link: "suppliers"
                },
                {
                    title: "Товары",
                    link: "products"
                },
                {
                    title: "Сотрудники",
                    link: "managers"
                },
                {
                    title: "История",
                    link: "history"
                },
            ]
        }
    }
}
</script>