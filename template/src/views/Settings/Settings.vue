<template>
  <div class="suppliers-page">
    <div class="suppliers">
      <v-toolbar />
      <v-navigation
        :links="links"
        action="Добавить настройки"
        @click="$router.push('/settings/add')"
      />
      <div class="suppliers-content content">
        <div class="suppliers-filter">
          <v-filter 
            @search="search" 
          />
        </div>
        <div class="suppliers-table" ref="dataContainer">
          <v-table 
            :headers="headers" 
            :data="filteredSuppliers" 
            actions 
            deleted 
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FilterMixin from "@/mixins/Filter";
export default {
  mixins: [FilterMixin],
  data() {
    return {
      headers: [
        {
          title: "Наименование",
          value: "name"
        },
        {
          title: "%",
          value: "percent"
        },
        {
          title: "Дата и время добавления",
          value: "created_at"
        }
      ],
      data: [
        {
          name: "НДС",
          percent: "на понижение",
          created_at: "25.12.2019  12:48"
        }
      ],
      filter_supplier: null,
      search_text: null,
      links: [{ title: "Настройка", to: "settings" }]
    };
  }
};
</script>
