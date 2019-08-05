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
                        :quantity="filterData.length"
                        @search="search"
                        @get_supplier="getDataBySupplier">
                    </v-filter>
                </div>
                <div class="suppliers-table" ref="dataContainer">
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
            <v-notification v-bind:list="notifications" @on_notification_shown="onNotify"></v-notification>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import moment from "moment";
import FilterMixin from "@/mixins/Filter"
import VNotification from "@/components/Notification/Notification"
import SuppliersServices from "@/services/Suppliers"
import FilterServices from "@/services/Filter"
import httpErrorHandler from "@/handlers/httpErrorHandler";
export default {
    mixins: [FilterMixin],
    components: {
        VNotification
    },
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
            data: [],
            filter_supplier: null,
            search_text: null
        }
    },
    computed: {
        ...mapState(['notifications']),
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
    created(){
        this.getSuppliers();
    },
    mounted() {},
    methods: {
        onNotify(){
            this.$store.commit('notificationsRead');
        },
        showLoadingOverlay() {
            return this.$loading.show({
                container: this.$refs.dataContainer,
                canCancel: true
            })
        },
        async getSuppliers(){
            let loader = this.showLoadingOverlay();
            try{
                this.data = [];
                let response = await SuppliersServices.getSuppliers();
                response.data.forEach(el => {
                    let time = moment(el.created_at).format("DD.MM.YYYY HH:mm")
                    this.data.push({
                        _id: el._id,
                        name: el.name,
                        legal_address: el.legal_address,
                        manager_phone: el.manager_phone,
                        created: time
                    })
                });
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }
            finally {
                loader.hide();
            }
        },
        async deleteSupplier(item){
            try{
                let response = await SuppliersServices.deleteSupplier(item._id);
                if(response.data.message){
                    this.$swal(response.data.message, '', 'success');
                    this.getSuppliers();
                }
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }
        },
        editSupplier(item){
            this.$router.push(`/supplier/edit/${item._id}`) ;
        }
    }
}
</script>
