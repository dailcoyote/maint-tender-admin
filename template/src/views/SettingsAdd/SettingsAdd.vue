<template>
    <div class="new_settings-page">
        <div class="new_settings">
            <v-toolbar />
            <v-navigation 
                :links="links" 
            />
            <div class="new_settings-content content form-content" ref="formContainer">
                <form @submit.prevent="" class="new_form">
                    <div class="new_form-input">
                        <label>Наименование</label>
                        <input type="text" v-model="name">
                    </div>
                    <div class="new_form-input">
                        <label>%</label>
                        <input type="text" v-model="percent">
                    </div>
                    <div class="new_form-actions">
                        <button 
                            class="new_form-button" 
                            type="submit">
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        action: String, // Для определение типа (Создание или Редактирование)
        title: String
    },
    data() {
        return {
            id: "",
            name: "",
            percent: "",
            links: [
                {
                    title: 'Настройка',
                    to: '/settings'
                },
                {
                    title: 'Добавить настройки',
                    to: '/settings/add'
                }
            ]
        }
    }
}
</script>