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
                        @get_supplier="getProductsBySupplier"
                        @get_category="getProductsByCategory">
                    </v-filter>
                </div>
                <div class="products-table">
                    <v-table 
                        :headers="headers" 
                        :data="filterData"
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
import FilterServices from "@/services/Filter"
import SuppliersServices from "@/services/Suppliers"
import ProductsServices from "@/services/Products"
export default {
    data(){
        return{
            dialog: false,
            current_product: {},
            suppliers: [],
            categories: [],
            headers: [
                {
                    title: "Товар",
                    value: "name"
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
                    value: "supplier"
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
                    title: "Цена за  шт",
                    value: "prices"
                },
                {
                    title: "Создано",
                    value: "created"
                },
            ],
            data: [],
            filter_supplier: null,
            filter_category: null
        }
    },
    created(){
        this.getCategories();
        this.getSuppliers();
        this.getProducts();
    },
    computed: {
        filterData(){
            if(!this.filter_supplier && !this.filter_category){
                return this.data;
            }else{
                if(this.filter_supplier && this.filter_category){
                    return this.data.filter(el => {
                        return el.supplierID == this.filter_supplier && el.categoryID == this.filter_category;
                    });
                }else if(this.filter_supplier && !this.filter_category){
                    return this.data.filter(el => {
                        return el.supplierID == this.filter_supplier;
                    });
                }else{
                    return this.data.filter(el => {
                        return el.categoryID == this.filter_category;
                    });
                }
                
            }
        }
    },
    methods: {
        search(search_text){
            // if(this.searchStudent === ''){
            //     return this.students;
            // }else{
            //     return this.students.filter(item => {
            //         if(item.name.toLowerCase().indexOf(this.searchStudent.toLowerCase()) !== -1){
            //             return item;
            //         }
            //     });
            // }
        },
        async getCategories(){
            try{
                let response = await FilterServices.getCategories();
                this.categories = response.data;
            }catch(err){
                console.log(err);
            }
        },
        async getSuppliers(){
            try{
                let response = await SuppliersServices.getSuppliers();
                this.suppliers = response.data;
            }catch(err){
                console.log(err);
            }
        },
        async getProducts(){
            try{
                let response = await ProductsServices.getProducts();
                response.data.forEach(el => {
                    this.data.push({
                        name: el.name,
                        model: el.model,
                        category: el.category.title,
                        categoryID: el.category._id,
                        supplier: el.supplier.name,
                        supplierID: el.supplier._id,
                        legal_address: el.supplier.legal_address,
                        manager_phone: el.supplier.manager_phone,
                        prices: el.price,
                        created: el.created_at.split('T')[0]
                    })
                });
            }catch(err){
                console.log(err);
            }
        },
        getProductsBySupplier(supplier){
            this.filter_supplier = supplier;
        },
        getProductsByCategory(id){
            this.filter_category = id;
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
