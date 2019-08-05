<template>
    <div class="history-page">
        <div class="history">
            <v-navigation name="История по сотрудникам"></v-navigation>
            <div class="history-content content">
                <div class="history-filter">
                    <v-filter 
                        isUsers
                        :users="data">
                    </v-filter>
                </div>
                <div class="history-table">
                    <v-table 
                        :headers="headers" 
                        :data="data"
                        actions
                        history
                        @view_history="viewHistory">
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserServices from "@/services/User"
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
    created(){
        this.getUsers();
    },
    methods: {
        async getUsers(){
            try{
                let response = await UserServices.getUsers();
                this.data = response.data;
                console.log(response.data)
                this.data.sort((a, b) => {
                    if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){
                        return 1;
                    }else if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){
                        return -1;
                    }
                    return 0;
                });
            }catch(err){
                console.log(err.response)
            }
        },
        viewHistory(item){
            alert(`История ${item.fullname} не доступна!`)
        }
    }
}
</script>