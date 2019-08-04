<template>
    <div class="suppliers-page">
        <div class="suppliers">
            <v-navigation 
                name="Поставщики">
                <template #actions>
                    <button 
                        class="suppliers_add-button" 
                        @click="$router.push('/new_supplier')">
                        <i class="material-icons">
                            add
                        </i>
                        <span>
                            Добавить поставщика
                        </span>
                    </button>
                </template>
            </v-navigation>
            <div class="suppliers-content content">
                <div class="suppliers-filter">
                    <v-filter 
                        isSuppliers
                        :suppliers="suppliers"
                        :quantity="data.length"
                        @search="search"
                        @get_supplier="getSupplier">
                    </v-filter>
                </div>
                <div class="suppliers-table">
                    <v-table 
                        :headers="headers" 
                        :data="data"
                        actions
                        deleted
                        @edit="editSupplier"
                        @delete="deleteSupplier">
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./suppliers.scss"
import SuppliersServices from "@/services/Suppliers"
import FilterServices from "@/services/Filter"
import httpErrorHandler from "@/handlers/httpErrorHandler";
export default {
    data(){
        return{
            suppliers: [],
            headers: [
                {
                    title: "Название компании",
                    value: "name"
                },
                {
                    title: "Юр. адрес",
                    value: "legal_address"
                },
                {
                    title: "Номер менеджера",
                    value: "manager_phone"
                },
                {
                    title: "Регистрация",
                    value: "created"
                },
            ],
            data: []
        }
    },
    created(){
        this.getSuppliers();
    },
    methods: {
        search(search_text){
            console.log(search_text);
        },
        async getSuppliers(){
            try{
                this.data = [];
                let response = await SuppliersServices.getSuppliers();
                response.data.forEach(el => {
                    this.data.push({
                        _id: el._id,
                        name: el.name,
                        legal_address: el.legal_address,
                        manager_phone: el.manager_phone,
                        created: el.created_at.split('T')[0]
                    })
                });
            }catch(err){
                console.log(err);
            }
        },
        async deleteSupplier(item){
            try{
                let response = await SuppliersServices.deleteSupplier(item._id);
                if(response.data.message){
                    alert(response.data.message);
                    this.getSuppliers();
                }
            }catch(err){
                console.log(err);
                this.$swal(httpErrorHandler(err));
            }
        },
        editSupplier(item){
            this.$router.push(`/supplier/${item._id}`) ;
        },
        getSupplier(){
        }
    }
}
</script>
