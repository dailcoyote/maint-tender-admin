<template>
    <div class="managers-page">
        <div class="managers">
            <v-navigation name="Сотрудники">
                <template #actions>
                    <button 
                        class="managers_add-button" 
                        @click="addUser">
                        <i class="material-icons">
                            add
                        </i>
                        <span>
                            Добавить сотрудника
                        </span>
                    </button>
                </template>
            </v-navigation>
            <div class="managers-content content">
                <div class="managers-table">
                    <v-table 
                        :headers="headers" 
                        :data="data"
                        actions
                        deleted
                        @delete="deleteUser"
                        @edit="editUser">
                    </v-table>
                </div>
            </div>
            <v-notification v-bind:list="notifications" @on_notification_shown="onNotify"></v-notification>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import FilterMixin from "@/mixins/Filter"
import VNotification from "@/components/Notification/Notification"
import UserServices from "@/services/User"
import httpErrorHandler from "@/handlers/httpErrorHandler";
export default {
    mixins: [FilterMixin],
    components: {
        VNotification
    },
    data(){
        return{
            headers: [
                {
                    title: "ФИО",
                    value: "fullname"
                },
                {
                    title: "Логин",
                    value: "username"
                },
                {
                    title: "Доступ",
                    value: "access_controls"
                }
            ],
            data: []
        }
    },
    computed: {
        ...mapState(['notifications']),
    },
    created(){
        this.getUsers();
    },
    methods: {
        onNotify(){
            this.$store.commit('notificationsRead');
        },
        showLoadingOverlay() {
            return this.$loading.show({
                container: this.$refs.dataContainer,
                canCancel: true
            })
        },
        async getUsers(){
            let loader = this.showLoadingOverlay();
            try{
                let response = await UserServices.getUsers();
                this.data = response.data;
                this.data.sort((a, b) => {
                    if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){
                        return 1;
                    }else if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){
                        return -1;
                    }
                    return 0;
                });
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }finally {
                loader.hide();
            }
        },
        async deleteUser(item){
            try{
                let response = await UserServices.deleteUser(item._id);
                if(response.data.message){
                    this.$swal(response.data.message, '', 'success');
                    this.getUsers();
                }
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }
        },
        addUser(){
            this.$store.commit('setCurrentUser', null);
            this.$store.commit('setAction', 'new');
            this.$router.push('/new_user');
        },
        editUser(item){
            this.$store.commit('setCurrentUser', item);
            this.$store.commit('setAction', 'edit');
            this.$router.push('/new_user');
        }
    }
}
</script>
