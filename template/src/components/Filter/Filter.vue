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
                    @input="search">
            </div>
        </div>
        <div class="filter-item" v-if="isSuppliers">
            <select v-model="supplier" @change="getSupplier">
                <option value="">Фильтр по поставщикам</option>
                <option 
                    v-for="(item, i) in suppliers"
                    :key="i"
                    :value="item._id">
                    {{item.name}}
                </option>
            </select>
        </div>
        <div class="filter-item" v-if="isManagers">
            <select v-model="manager" @change="getManager">
                <option value="">Фильтр по сотрудникам</option>
                <option 
                    v-for="(item, i) in managers"
                    :key="i"
                    :value="item.value">
                    {{item.name}}
                </option>
            </select>
        </div>
        <div class="filter-item" v-if="isProduct">
            <select v-model="category" @change="getCategory">
                <option value="">Фильтр по категориям</option>
                <option 
                    v-for="(item, i) in categories"
                    :key="i"
                    :value="item._id">
                    {{item.title}}
                </option>
            </select>
        </div>
        <div class="quantity" v-if="quantity">
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
        managers: Array,
        quantity: Number,
        isProduct: Boolean,
        isManagers: Boolean,
        isSuppliers: Boolean
    },
    data(){
        return{
            search_text: "",
            supplier: "",
            category: "",
            manager: ""
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
        },
        getManager(){
            this.$emit("get_manager", this.manager);
        }
    }
}
</script>
