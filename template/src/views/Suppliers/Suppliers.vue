<template>
    <div class="suppliers-page">
        <div class="suppliers">
            <v-navigation 
                name="Поставщики">
                <template #actions>
                    <button 
                        class="suppliers_add-button" 
                        @click="addSupplier">
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
                        :quantity="filterData.length"
                        @search="search"
                        @get_supplier="getDataBySupplier">
                    </v-filter>
                </div>
                <div class="suppliers-table">
                    <v-table 
                        :headers="headers" 
                        :data="filterData"
                        actions
                        deleted
                        @delete="deleteSupplier"
                        @edit="editSupplier">
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SuppliersServices from "@/services/Suppliers"
import FilterMixin from "@/mixins/Filter"
export default {
    mixins: [FilterMixin],
    data(){
        return{
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
        async getSuppliers(){
            try{
                this.data = [];
                let response = await SuppliersServices.getSuppliers();
                response.data.forEach(el => {
                    this.data.push({
                        ...el,
                        supplierID: el._id,
                        created: el.created_at.split('T')[0]
                    });
                });
                this.data.sort((a, b) => {
                    if (a.created_at > b.created_at) {
                        return -1;
                    }
                    if (a.created_at < b.created_at) {
                        return 1;
                    }
                    return 0;
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
            }
        },
        addSupplier(){
            this.$store.commit('setCurrentSupplier', null);
            this.$store.commit('setAction', 'new');
            this.$router.push('/new_supplier');
        },
        editSupplier(item){
            this.$store.commit('setCurrentSupplier', item);
            this.$store.commit('setAction', 'edit');
            this.$router.push('/new_supplier');
        }
    }
}
</script>
