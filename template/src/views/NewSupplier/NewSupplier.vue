<template>
    <div class="new_supplier-page">
        <div class="new_supplier">
            <v-navigation name="Добавить поставщика" allowBack></v-navigation>
            <div class="new_supplier-content content">
                <form @submit.prevent="addNewSupplier" class="new_form">
                    <div class="new_form-input">
                        <label>Поставщик (название организации)</label>
                        <input type="text" v-model="name">
                    </div>
                    <div class="new_form-input">
                        <label>Юр.Адрес</label>
                        <input type="text" v-model="legal_address">
                    </div>
                    <div class="new_form-input">
                        <label>Имя Менеджера</label>
                        <input type="text" v-model="manager_name">
                    </div>
                    <div class="new_form-input">
                        <label>Номер менеджера</label>
                        <input type="text" v-model="manager_phone">
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
export default {
    props: {
        action: String // Для определение типа (Создание или Редактирование)
    },
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
    methods: {
        fileChange(e){
            this.file_name = e.target.files[0].name;
            this.file_data = e.target.files || e.dataTransfer.files;
        },
        deleteFile(){
            this.file_name = "Выберите файл";
            this.file_data = "";
        },
        async addNewSupplier(){
            try{
                let response = await SuppliersServices.addSupplier({
                    name: this.name,
                    legal_address:  this.legal_address,
                    manager_name:  this.manager_name,
                    manager_phone:  this.manager_phone,
                    file: this.file_data[0]
                });
                console.log(response);
                this.$router.push("/suppliers");
            }catch(err){
                console.log(err.response);
            }
        }
    }
}
</script>