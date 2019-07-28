<template>
    <div class="managers-page">
        <div class="managers">
            <v-navigation name="Сотрудники">
                <template #actions>
                    <button 
                        class="managers_add-button" 
                        @click="$router.push('/new_manager')">
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
                        :data="data">
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./managers.scss"
export default {
    data(){
        return{
            headers: [
                {
                    title: "ФИО",
                    value: "fullname"
                },
                {
                    title: "Логин",
                    value: "login"
                },
                {
                    title: "Доступ",
                    value: "access"
                }
            ],
            data: [
                {
                    fullname: "Маша",
                    login: "masha@tender.com",
                    access: ["ЕАП", "РЕЕСТР", "САМРУККАЗЫНА"],
                }
            ]
        }
    },
    methods: {
        search(search_text){
            console.log(search_text);
        },
        getSupplier(supplier){
            console.log(supplier)
        }
    }
}
</script>
