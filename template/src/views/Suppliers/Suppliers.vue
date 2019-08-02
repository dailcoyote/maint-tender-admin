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
                        deleted>
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
                    value: "created_at"
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
                let response = await SuppliersServices.getSuppliers();
                this.data = response.data;
            }catch(err){
                console.log(err);
            }
        },
        getSupplier(){
            console.log("get")
        }
    }
}
</script>
