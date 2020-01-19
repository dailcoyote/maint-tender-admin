<template>
    <div class="login-page">
        <div class="login">
            <div class="login-container">
                <h1>АВТОРИЗАЦИЯ</h1>
                <form 
                    class="login-form"
                    @submit.prevent="login">
                    <div class="login-form_item">
                        <label>Логин</label>
                        <input type="text" v-model="username">
                    </div> 
                    <div class="login-form_item">
                        <label>Пароль</label>
                        <div>
                            <input 
                                :type="showPassword ? 'password' : 'text'" 
                                v-model="password">
                            <img 
                                :src="showPassword ? eye_open : eye_close" 
                                @click="showPassword = !showPassword"
                                alt="eye">
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        :disabled="isLoading">
                        <span v-if="isLoading">Загрузка...</span>
                        <span v-else>Войти</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import "./login.scss"
import AuthServices from "@/services/Auth"
import httpErrorHandler from "@/handlers/httpErrorHandler";
import eye_open from '@/assets/eye.png';
import eye_close from '@/assets/eye2.png';

export default {
    data(){
        return{
            username: process.env.VUE_APP_MODE === "development" 
                    ? process.env.VUE_APP_ADMIN_EMAIL : "",
            password: process.env.VUE_APP_MODE === "development" 
                    ? process.env.VUE_APP_ADMIN_PASSWORD : "",
            isLoading: false,
            showPassword: false,
            eye_open,
            eye_close
        }
    },
    methods: {
        async login(){
            try{
                this.isLoading = true;
                let response = await AuthServices.login({
                    username: this.username,
                    password: this.password
                });
                const access = response.data.adminControls;
                if(access.indexOf("NO_ACCESS") >= 0) {
                    throw "NO_ACCESS";
                }
                this.isLoading = false;
                this.$store.dispatch('login', response.data);
                this.$router.push('/');
            }
            catch(err){
                if(err == "NO_ACCESS"){
                    this.$swal({
                        type: 'error',
                        text: "У Вас отсутствуют права доступа к административной панели!"
                    });
                }
                else {
                    this.$swal(httpErrorHandler(err));
                }
                this.isLoading = false;
            }
        }
    }
}
</script>
