<template>
  <div class="suppliers-page">
    <div class="suppliers">
      <v-toolbar />
      <div class="suppliers-content content">
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
        }
      ],
      data: [
        {
          name: "НДС",
          percent: "на понижение",
        },
        {
          name: "НДС",
          percent: "edit",
        },
      ],
      filter_supplier: null,
      search_text: null,
      links: [{ title: "Настройка", to: "settings" }]
    };
  }
};
</script>
