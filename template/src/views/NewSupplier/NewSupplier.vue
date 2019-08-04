<template>
    <div class="new_supplier-page">
        <div class="new_supplier">
            <v-navigation :name="navigation_title" allowBack></v-navigation>
            <div class="new_supplier-content content">
                <form @submit.prevent="addNewSupplier" class="new_form">
                    <div class="new_form-input">
                        <label>Поставщик (название организации)</label>
                        <input type="text" v-model="name" required>
                    </div>
                    <div class="new_form-input">
                        <label>Юр.Адрес</label>
                        <input type="text" v-model="legal_address" required>
                    </div>
                    <div class="new_form-input">
                        <label>Имя Менеджера</label>
                        <input type="text" v-model="manager_name" required>
                    </div>
                    <div class="new_form-input">
                        <label>Номер менеджера</label>
                        <input type="text" v-model="manager_phone" required>
                    </div>
                    <div class="new_form-input">
                        <label>Импорт прайс списка</label>
                        <div class="new_form-file">
                            <label>
                                <input type="file" @change="fileChange">
                                {{file_name}}
                            </label>
                            <button @click="deleteFile">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div class="new_form-actions">
                        <button 
                            class="new_form-button"
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
import "./new_supplier.scss"
import SuppliersServices from "@/services/Suppliers"
import { mapState } from 'vuex'
export default {
    data(){
        return{
            name: "",
            legal_address: "",
            manager_name: "",
            manager_phone: "",
            price_list: "",
            file_name: "Выберите файл",
            file_data: ""
        }
    },
    computed: {
        ...mapState(['current_supplier', 'action']),
        navigation_title(){
            if(this.action == 'new'){
                return "Добавить поставщика"
            }else {
                return "Редактировать поставщика"
            }
        }
    },
    created(){
        this.initData();
    },
    methods: {
        fileChange(e){
            this.file_name = e.target.files[0].name;
            this.file_data = e.target.files[0] || e.dataTransfer.files[0];
        },
        deleteFile(){
            this.file_name = "Выберите файл";
            this.file_data = "";
        },
        initData(){
            if(this.current_supplier){
                this.name = this.current_supplier.name;
                this.legal_address = this.current_supplier.legal_address;
                this.manager_name = this.current_supplier.manager_name;
                this.manager_phone = this.current_supplier.manager_phone;
                this.price_list = this.current_supplier.price_list;
            }
        },
        async addNewSupplier(){
            try{
                let data = {
                    name: this.name,
                    legal_address: this.legal_address,
                    manager_name: this.manager_name,
                    manager_phone: this.manager_phone,
                    price_list: this.price_list,
                    file_data: this.file_data
                }
                if(this.current_supplier){
                    data._id = this.current_supplier._id;
                }
                let response = await SuppliersServices.addSupplier(data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                console.log(response);
                this.$router.push("/suppliers");
            }catch(err){
                console.log(err.response);
                if(err.response.data.message){
                    alert(err.response.data.message)
                }
            }
        },
    }
}
</script>