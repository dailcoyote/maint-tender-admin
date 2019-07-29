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
                        <form @submit.prevent="" class="products_form">
                            <div class="products_form-col">
                                <div class="products_form-item">
                                    Товар: {{current_product.product}}
                                </div>
                                <div class="products_form-item">
                                    Модель: {{current_product.model}}
                                </div>
                                <div class="products_form-item">
                                    Категория: {{current_product.category}}
                                </div>
                            </div>
                            <div class="products_form-col">
                                <div class="products_form-item">
                                    Цены
                                    <div class="products_form-prices">
                                        <div class="products_form-input">
                                            <label>
                                                KZT: 
                                            </label>
                                            <input type="text" v-model="current_product.prices.kzt">
                                        </div>
                                        <div class="products_form-input">
                                            <label>
                                                РУБ: 
                                            </label>
                                            <input type="text" v-model="current_product.prices.rub">
                                        </div>
                                        <div class="products_form-input">
                                            <label>
                                                USD: 
                                            </label>
                                            <input type="text" v-model="current_product.prices.usd">
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="save">Сохранить</button>
                            </div>
                        </form>
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
