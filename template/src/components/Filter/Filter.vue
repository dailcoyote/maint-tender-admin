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
        <div class="filter-item" v-if="isUsers">
            <select v-model="users" @change="getUser">
                <option value="">Фильтр по сотрудникам</option>
                <option 
                    v-for="(item, i) in users"
                    :key="i"
                    :value="item.fullname">
                    {{item.fullname}}
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
        users: Array,
        quantity: Number,
        isProduct: Boolean,
        isUsers: Boolean,
        isSuppliers: Boolean
    },
    data(){
        return{
            search_text: "",
            supplier: "",
            category: "",
            user: ""
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
        getUser(){
            this.$emit("get_user", this.user);
        }
    }
}
</script>
