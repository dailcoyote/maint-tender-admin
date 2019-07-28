<template>
    <div class="products-page">
        <div class="products">
            <v-navigation name="Товары"></v-navigation>
            <div class="products-content content">
                <div class="products-filter">
                    <v-filter 
                        isSuppliers
                        isProduct
                        :suppliers="suppliers"
                        :categories="categories"
                        :quantity="data.length"
                        @search="search"
                        @get_supplier="getSupplier">
                    </v-filter>
                </div>
                <div class="products-table">
                    <v-table 
                        :headers="headers" 
                        :data="data"
                        actions
                        @edit="openDialog">
                    </v-table>
                    <v-dialog 
                        v-if="dialog"
                        @close="closeDialog">
                        <!--// TODO:  форма для редактирования продукта -->
                        {{current_product}}
                    </v-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./products.scss"
export default {
    data(){
        return{
            dialog: false,
            current_product: {},
            suppliers: [
                {
                    title: "Nike",
                    value: "0"
                }
            ],
            categories: [
                {
                    title: "Nike",
                    value: "0"
                }
            ],
            headers: [
                {
                    title: "Товар",
                    value: "product"
                },
                {
                    title: "Модель",
                    value: "model"
                },
                {
                    title: "Категория",
                    value: "category"
                },
                {
                    title: "Название организации",
                    value: "organization_name"
                },
                {
                    title: "Юр. адрес",
                    value: "address"
                },
                {
                    title: "Номер менеджера",
                    value: "manager_phone"
                },
                {
                    title: "Цена за  шт",
                    value: "prices"
                },
                {
                    title: "Создано",
                    value: "created"
                },
            ],
            data: [
                {
                    product: "Ноутбук",
                    model: "Леново G508",
                    category: "Компьютеры",
                    organization_name: "Alser",
                    address: "Алматы, Абая гагарина",
                    manager_phone: "8777586548",
                    prices: {
                        kzt: "20000,00",
                        rub: "6005,00",
                        usd: "46,13"
                    },
                    created: "12.06.2019"
                }
            ]
        }
    },
    methods: {
        search(search_text){
            console.log(search_text);
        },
        getSupplier(supplier){
            console.log(supplier)
        },
        openDialog(item){
            this.dialog = true;
            this.current_product = Object.assign({}, item);
        },
        closeDialog(){
            this.dialog = false;
            this.current_product = {};
        }
    }
}
</script>
