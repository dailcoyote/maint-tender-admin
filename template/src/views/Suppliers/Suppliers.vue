<template>
    <div class="suppliers-page">
        <div class="suppliers">
            <v-navigation 
                name="Поставщики">
                <template #actions>
                    <button 
                        class="suppliers_add-button" 
                        @click="$router.push('/suppliers/new')">
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
                        @get_supplier="getSupplierById">
                    </v-filter>
                </div>
                <div class="suppliers-table">
                    <v-table 
                        :headers="headers" 
                        :data="filterData"
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
            data: [],
            filter_supplier: null,
            search_text: null
        }
    },
    created(){
        this.getSuppliersShortList();
        this.getSuppliersDataset();
    },
    computed: {
        filterData(){
            if(!this.search_text && !this.filter_supplier){
                return this.data;
            }
            if(this.search_text && !this.filter_supplier){
                return this.data.filter(el => {
                    if(el.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !== -1){
                        return el;
                    }
                });
            }
            else if(!this.search_text && this.filter_supplier) {
                return this.data.filter(el => {
                    return el._id == this.filter_supplier;
                });
            }
            else {
                return this.data.filter(el => {
                    if(el.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !== -1
                     && el._id == this.filter_supplier){
                        return el;
                    }
                });
            }
        }
    },
    methods: {
        search(search_text){
            this.search_text = search_text;
        },
        async getSuppliersShortList(){
            try{
                this.suppliers = [];
                let response = await SuppliersServices.getSuppliersShortList();
                this.suppliers = response.data;
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }
        },
        async getSuppliersDataset(){
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
                this.$swal(httpErrorHandler(err));
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
        getSupplierById(supplier){
            this.filter_supplier = supplier;
        },
        editSupplier(item){
            this.$router.push(`/supplier/edit/${item._id}`) ;
        },
        getSupplier(){
        }
    }
}
</script>
