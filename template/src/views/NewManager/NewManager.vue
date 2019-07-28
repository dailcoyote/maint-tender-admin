<template>
    <div class="new_manager-page">
        <div class="new_manager">
            <v-navigation name="Добавить сотрудника" allowBack></v-navigation>
            <div class="new_manager-content content">
                <form @submit.prevent="" class="new_form">
                    <div class="new_form-input">
                        <label>ФИО</label>
                        <input type="text" v-model="fullname">
                    </div>
                    <div class="new_form-input">
                        <label>Логин</label>
                        <input type="text" v-model="login">
                    </div>
                    <div class="new_form-input">
                        <label>Пароль</label>
                        <input type="text" v-model="password">
                    </div>
                    <div class="new_form-input">
                        <label>Права доступа</label>
                        <div class="new_form-access">
                            <label>
                                <input type="checkbox" v-model="access" value="ЕАП">
                                Евразийский электронный портал
                            </label>
                            <label>
                                <input type="checkbox" v-model="access" value="Самрук">
                                Самрук Казына
                            </label>
                            <label>
                                <input type="checkbox" v-model="access" value="Реестр">
                                Реестр.кз
                            </label>
                            <label>
                                <input type="checkbox" v-model="access" value="Госзакуп">
                                Госзакуп
                            </label>
                        </div>
                    </div>
                    <div class="new_form-actions">
                        <button 
                            class="new_form-button delete"
                            type="submit">
                            Удалить
                        </button>
                        <button 
                            class="new_form-button edit"
                            type="submit">
                            Редактировать
                        </button>
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
import "./new_manager.scss"
export default {
    data(){
        return{
            fullname: "",
            login: "",
            password: "",
            access: []
        }
    }
}
</script>
