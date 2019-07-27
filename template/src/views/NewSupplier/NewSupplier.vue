<template>
    <div class="new_supplier-page">
        <div class="new_supplier">
            <v-navigation name="Добавить поставщика" allowBack></v-navigation>
            <div class="new_supplier-content content">
                <form @submit.prevent="" class="new_supplier-form">
                    <div class="new_supplier-input">
                        <label>Поставщик (название организации)</label>
                        <input type="text" v-model="title">
                    </div>
                    <div class="new_supplier-input">
                        <label>Юр.Адрес</label>
                        <input type="text" v-model="address">
                    </div>
                    <div class="new_supplier-input">
                        <label>Имя Менеджера</label>
                        <input type="text" v-model="manager_name">
                    </div>
                    <div class="new_supplier-input">
                        <label>Номер менеджера</label>
                        <input type="text" v-model="manager_phone">
                    </div>
                    <div class="new_supplier-input">
                        <label>Импорт прайс списка</label>
                        <div class="new_supplier-file">
                            <label>
                                <input type="file" @change="fileChange">
                                {{file_name}}
                            </label>
                            <button @click="deleteFile">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <button 
                        class="new_supplier-button"
                        type="submit">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import "./new_supplier.scss"
export default {
    data(){
        return{
            title: "",
            address: "",
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
            this.file_data = e.target.value;
        },
        deleteFile(){
            this.file_name = "Выберите файл";
            this.file_data = "";
        }
    }
}
</script>