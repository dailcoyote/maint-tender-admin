<template>
    <div class="suppliers-page">
        <div class="suppliers">
            <v-navigation 
                name="Поставщики">
                <template #actions>
                    <button 
                        class="suppliers_add-button" 
                        @click="$router.push('/new_supplier')">
                        <i class="material-icons">
                            add
                        </i>
                        <span>
                            Добавить поставщика
                        </span>
                    </button>
                    <v-dialog 
                        v-if="suppliers_dialog" 
                        @close="suppliers_dialog = false">
                        Добавить поставщика
                    </v-dialog>
                </template>
            </v-navigation>
            <div class="suppliers-content content">
                <div class="suppliers-filter">
                    <v-filter 
                        :suppliers="suppliers"
                        isProduct
                        :quantity="suppliers.length"
                        @search="search"
                        @get_supplier="getSupplier">
                    </v-filter>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./suppliers.scss"
export default {
    data(){
        return{
            suppliers_dialog: false,
            suppliers: [
                {
                    title: "Nike",
                    value: "0"
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
        }
    }
}
</script>
