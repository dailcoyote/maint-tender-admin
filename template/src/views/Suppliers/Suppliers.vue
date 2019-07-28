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
                <div class="suppliers-table">
                    <v-table 
                        :headers="headers" 
                        :data="data" 
                        actions
                        deleted>
                    </v-table>
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
            suppliers: [
                {
                    title: "Nike",
                    value: "0"
                }
            ],
            headers: [
                {
                    title: "Название компании",
                    value: "title"
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
                    title: "Регистрация",
                    value: "register_date"
                },
            ],
            data: [
                {
                    title: "Alser",
                    address: "Алматы, Абая гагарина",
                    manager_phone: "8777586548",
                    register_date: "12.06.2019"
                },
                {
                    title: "Alser",
                    address: "Алматы, Абая гагарина, дом 8 квартира 17",
                    manager_phone: "8777586548",
                    register_date: "12.06.2019"
                },
                {
                    title: "Alser",
                    address: "Алматы, Абая гагарина",
                    manager_phone: "8777586548",
                    register_date: "12.06.2019"
                },
                {
                    title: "Alser",
                    address: "Алматы, Абая гагарина",
                    manager_phone: "8777586548",
                    register_date: "12.06.2019"
                },
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
