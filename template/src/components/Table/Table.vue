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
                        <span v-if="item[key.value]">
                            {{item[key.value]}}
                        </span>
                    </td>
                    <td v-if="actions">
                        <div class="table_actions">
                            <div class="table_action">
                                Редактировать
                            </div>
                            <div class="table_action" v-if="deleted">
                                Удалить
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
        deleted: Boolean
    }
}
</script>