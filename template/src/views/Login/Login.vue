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
                    <button>Войти</button>
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
            email: "",
            password: ""
        }
    },
    methods: {
        async login(){
            try{
                this.$router.push("/suppliers")
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
