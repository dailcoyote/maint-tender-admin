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
            <v-sidebar 
                v-if="sidebar"
                @close="sidebar = false">
            </v-sidebar>
        </transition>
    </div>
</template>
<script>
import "./navigation.scss"
import VSidebar from "../Sidebar/Sidebar"
export default {
    props: {
        name: String,
        allowBack: Boolean
    },
    components: {
        VSidebar
    },
    data(){
        return{
            sidebar: false,
        }
    }
}
</script>