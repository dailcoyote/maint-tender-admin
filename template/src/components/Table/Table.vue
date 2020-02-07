<template>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th>
                        №  
                    </th>
                    <th
                        v-for="(item, i) in headers"
                        :key="i">
                        {{item.title}}    
                    </th>
                    <th v-if="actions"></th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, i) in data"
                    :key="i">
                    <td>
                        {{i + 1}}
                    </td>
                    <td 
                        v-for="(key, j) in headers"
                        :key="j">
                        <span v-if="key.value == 'prices'">
                            <span v-if="item.prices.kzt">
                                {{item.prices.kzt}} тг
                            </span>
                            <br>
                            <span v-if="item.prices.rub">
                                {{item.prices.rub}} руб
                            </span>
                            <br>
                            <span v-if="item.prices.usd">
                                {{item.prices.usd}} $
                            </span>
                        </span>
                        <span v-else-if="key.value == 'access_controls'">
                            <span 
                                v-for="(access, k) in item[key.value]"
                                :key="k">
                                {{access}} <br>
                            </span>
                        </span>
                        <span v-else-if="key.value == 'percent'">
                             <span v-if="item.percent === 'edit'">
                               <input type="text">
                            </span>
                            <span v-else>
                                {{item.percent}}
                            </span>
                        </span>
                        <span v-else>
                            <span v-if="item[key.value]">
                                {{item[key.value]}}
                            </span>
                        </span>
                    </td>
                    <td v-if="actions">
                        <div class="table_actions">
                            <div 
                                class="table_action" 
                                v-if="edit">
                                <button>
                                    Сохранить
                                </button>
                            </div>
                            <div 
                                class="table_action" 
                                @click="editItem(item)"
                                v-if="!history && !edit">
                                Редактировать
                            </div>
                            <div 
                                v-if="deleted"
                                class="table_action"
                                @click="deleteItem(item)"> 
                                Удалить
                            </div>
                            <div 
                                v-if="history"
                                class="table_action"
                                @click="viewHistory(item)"> 
                                Посмотреть историю
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import "./table.scss"
export default {
    props: {
        headers: Array,
        data: Array,
        actions: Boolean,
        deleted: Boolean,
        history: Boolean,
        edit: Boolean
    },
    methods: {
        editItem(item){
            this.$emit("edit", item);
        },
        deleteItem(item){
            this.$emit("delete", item);
        },
        viewHistory(item){
            this.$emit("view_history", item);
        }
    }
}
</script>