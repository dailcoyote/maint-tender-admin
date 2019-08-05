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
                        :quantity="filterData.length"
                        @search="search"
                        @get_supplier="getDataBySupplier"
                        @get_category="getDataByCategory">
                    </v-filter>
                </div>
                <div class="products-table" ref="dataContainer">
                    <v-table 
                        :headers="headers" 
                        :data="filterData"
                        actions
                        @edit="openDialog">
                    </v-table>
                    <v-dialog 
                        v-if="dialog"
                        @close="closeDialog">
                        <form @submit.prevent="updateProduct" class="products_form">
                            <div class="products_form-col">
                                <div class="products_form-item">
                                    Товар: {{currentProduct.name}}
                                </div>
                                <div class="products_form-item">
                                    Модель: {{currentProduct.model}}
                                </div>
                                <div class="products_form-item">
                                    Категория: {{currentProduct.category}}
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
                                            <input 
                                                type="text" 
                                                v-model="currentProduct.prices.kzt"
                                                @change="exchangeRates"
                                                required>
                                        </div>
                                        <div class="products_form-input">
                                            <label>
                                                РУБ: 
                                            </label>
                                            <input 
                                                type="text" 
                                                v-model="currentProduct.prices.rub"
                                                required>
                                        </div>
                                        <div class="products_form-input">
                                            <label>
                                                USD: 
                                            </label>
                                            <input 
                                                type="text" 
                                                v-model="currentProduct.prices.usd"
                                                required>
                                        </div>
                                    </div>
                                </div>
                                <button class="save">
                                    Сохранить
                                </button>
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
import ProductsServices from "@/services/Products"
import httpErrorHandler from "@/handlers/httpErrorHandler"
import FilterMixin from "@/mixins/Filter"
export default {
    mixins: [FilterMixin],
    data(){
        return{
            dialog: false,
            current_product: null,
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
        }
    },
    created(){
        this.getProducts();
    },
    computed: {
        currentProduct(){
            return this.current_product;
        }
    },
    methods: {
        async getProducts(){
            let loader = this.showLoadingOverlay();
            try{
                this.data = [];
                let response = await ProductsServices.getProducts();
                response.data.forEach(el => {
                    this.data.push({
                        _id: el._id,
                        name: el.name,
                        model: el.model,
                        category: el.category.title,
                        categoryID: el.category._id,
                        supplier: el.supplier.name,
                        supplierID: el.supplier._id,
                        legal_address: el.supplier.legal_address,
                        manager_phone: el.supplier.manager_phone,
                        prices: el.price,
                        created_at: el.created_at,
                        created: el.created_at.split('T')[0]
                    })
                });
            }catch(err){
                this.$swal(httpErrorHandler(err));
            }
            finally {
                loader.hide();
            }
        },
        async updateProduct(){
            try{
                let response = await ProductsServices.updateProduct(this.current_product, {
                    headers: { 
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });
                if(response.data.message){
                    this.dialog = false;
                    this.getProducts();
                    setTimeout(()=>{
                        this.$swal(response.data.message, '', 'success');
                    }, 100)
                }
            }catch(err){ 
                this.$swal(httpErrorHandler(err));
            }
        },
        async exchangeRates(){
            try{
                if(this.current_product){
                    let response = await ProductsServices.exchangeRates(this.current_product.prices.kzt);
                    const rates = response.data;
                    this.current_product.prices.usd = rates.USD;
                    this.current_product.prices.rub = rates.RUB;
                }
            }catch(err){
                console.log(err);
            }
        },
        showLoadingOverlay() {
            return this.$loading.show({
                container: this.$refs.dataContainer,
                canCancel: true
            })
        },
        openDialog(item){
            this.dialog = true;
            this.current_product = {
                _id: item._id,
                name: item.name,
                model: item.model,
                category: item.category,
                prices: {
                    kzt: item.prices.kzt,
                    rub: item.prices.rub,
                    usd: item.prices.usd,
                }
            }
        },
        closeDialog(){
            this.dialog = false;
            this.current_product = null;
        }
    }
}
</script>
