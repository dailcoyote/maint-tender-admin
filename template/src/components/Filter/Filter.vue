<template>
    <div class="filter">
        <div class="filter-item">
            <div class="search-input">
                <i class="material-icons">
                    search
                </i>
                <input 
                    type="text"
                    v-model="search_text" 
                    placeholder="Поиск"
                    @change="search">
            </div>
        </div>
        <div class="filter-item">
            <select v-model="supplier" @change="getSupplier">
                <option value="">Фильтр по поставщикам</option>
                <option 
                    v-for="(item, i) in suppliers"
                    :key="i"
                    :value="item.value">
                    {{item.title}}
                </option>
            </select>
        </div>
        <div class="filter-item" v-if="isProduct">
            <select v-model="category" @change="getCategory">
                <option value="">Фильтр по категориям</option>
                <option 
                    v-for="(item, i) in categories"
                    :key="i"
                    :value="item.value">
                    {{item.title}}
                </option>
            </select>
        </div>
        <div class="quantity">
            Количество: {{quantity}}
        </div>
    </div>
</template>
<script>
import "./filter.scss"
export default {
    props: {
        suppliers: Array,
        categories: Array,
        quantity: Number,
        isProduct: Boolean
    },
    data(){
        return{
            search_text: "",
            supplier: "",
            category: ""
        }
    },
    methods: {
        search(){
            this.$emit("search", this.search_text);
        },
        getSupplier(){
            this.$emit("get_supplier", this.supplier);
        },
        getCategory(){
            this.$emit("get_category", this.category);
        }
    }
}
</script>
