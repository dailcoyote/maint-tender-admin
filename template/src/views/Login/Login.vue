<template>
    <div class="login-page">
        <div class="login">
            <div class="login-container">
                <form 
                    class="login-form"
                    @submit.prevent="login">
                    <div class="login-form_item">
                        <label>Эл. почта</label>
                        <input type="email" v-model="email">
                    </div>
                    <div class="login-form_item">
                        <label>Пароль</label>
                        <input type="password" v-model="password">
                    </div>
                    <button :disabled="isLoading">
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
export default {
    data(){
        return{
            email: "admin@maint.kz",
            password: "maint1234",
            isLoading: false,
        }
    },
    methods: {
        async login(){
            try{
                this.isLoading = true;
                let response = await AuthServices.login({
                    username: this.email,
                    password: this.password
                });
                console.log(response);
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
                        text: "У Вас отсутствуют права доступа к этому ресурсу!"
                    });
                }else{
                    const error = err.response;
                    if(error.data.error == "Unauthorized"){
                        this.$swal({
                            type: 'error',
                            text: error.data.message || "Вы не прошли аутентификацию. Проверьте правильность ввода имени пользователя и пароля!"
                        });
                    }else{
                        this.$swal({
                            type:'error',
                            text: error.data
                        });
                    }
                }
                this.isLoading = false;
            }
        }
    }
}
</script>
