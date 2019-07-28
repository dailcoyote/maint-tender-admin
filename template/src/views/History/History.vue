<template>
    <div class="history-page">
        <div class="history">
            <v-navigation name="История по сотрудникам"></v-navigation>
            <div class="history-content content">
                <div class="history-filter">
                    <v-filter 
                        isManagers
                        :managers="data"
                        @search="search"
                        @get_managers="getManagers">
                    </v-filter>
                </div>
                <div class="history-table">
                    <v-table 
                        :headers="headers" 
                        :data="data"
                        actions
                        deleted>
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./history.scss"
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
        getManagers(manager){
            console.log(manager)
        }
    }
}
</script>
