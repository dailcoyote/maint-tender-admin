<template>
    <div class="new_manager-page">
        <div class="new_manager">
            <v-toolbar />
            <v-navigation 
                :links="links"
            />
            <div class="new_manager-content content form-content" ref="formContainer">
                <form @submit.prevent="addNewUser" class="new_form">
                    <div class="new_form-input">
                        <label>ФИО</label>
                        <input 
                            type="text" 
                            v-model="fullname">
                    </div>
                    <div class="new_form-input">
                        <label>Логин</label>
                        <input 
                            type="text" 
                            v-model="username">
                    </div>
                    <div class="new_form-input">
                        <label>Пароль</label>
                        <input 
                            type="password" 
                            v-model="password">
                    </div>
                    <div class="new_form-input">
                        <label>Права доступа</label>
                        <div class="new_form-access">
                            <label>
                                <input 
                                    type="checkbox" 
                                    v-model="access_controls" 
                                    value="ЕЭП">
                                Евразийский электронный портал
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    v-model="access_controls" 
                                    value="САМРУККАЗЫНА">
                                Самрук Казына
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    v-model="access_controls" 
                                    value="РЕЕСТР">
                                Реестр.кз
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    v-model="access_controls" 
                                    value="ГОСЗАКУП">
                                Госзакуп
                            </label>
                        </div>
                    </div>
                    <div class="new_form-actions">
                        <button 
                            class="new_form-button save"
                            type="submit">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import UserServices from "@/services/User"
import httpErrorHandler from "@/handlers/httpErrorHandler"
export default {
    data(){
        return{
            fullname: "",
            username: "",
            password: "",
            access_controls: [],
            links: [
                {
                    title: 'Сотрудники',
                    to: '/users'
                },
                {
                    title: 'Добавить сотрудника',
                    to: '/new_user'
                },
            ]
        }
    },
    computed: {
        ...mapState(['current_user', 'action']),
        navigation_title(){
            if(this.action == 'new'){
                return "Добавить пользователя"
            }else {
                return "Редактировать пользователя"
            }
        }
    }, 
    created(){
        this.initData();
    },
    methods: {
        initData(){
            if(this.current_user){
                this.fullname = this.current_user.fullname;
                this.username = this.current_user.username;
                this.password = this.current_user.password;
                this.access_controls = this.current_user.access_controls;
            }
        },
        showLoadingOverlay() {
            return this.$loading.show({
                container: this.$refs.formContainer,
                canCancel: true
            })
        },
        async addNewUser(){
            let loader = this.showLoadingOverlay();
            try{
                let data = {
                    fullname: this.fullname,
                    username: this.username,
                    password: this.password,
                    access_controls: this.access_controls,
                }
                if(this.current_user){
                    data._id = this.current_user._id;
                }
                let response = await UserServices.addUser(data);
                this.$store.commit("pushNotification", response.data.message);
                this.$router.push("/users");
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }finally {
                loader.hide();
            }
        },
    }
}
</script>
