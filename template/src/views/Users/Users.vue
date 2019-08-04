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
        </div>
    </div>
</template>
<script>
import FilterMixin from "@/mixins/Filter"
import UserServices from "@/services/User"
export default {
    mixins: [FilterMixin],
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
        async deleteUser(item){
            try{
                let response = await UserServices.deleteUser(item._id);
                if(response.data.message){
                    alert(response.data.message);
                    this.getUsers();
                }
            }catch(err){
                console.log(err);
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
