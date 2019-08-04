<template>
  <div class="new_supplier-page">
    <div class="new_supplier">
      <v-navigation name="Добавить поставщика" allowBack></v-navigation>
      <div class="new_supplier-content content">
        <form @submit.prevent="addNewSupplier" class="new_form">
          <div class="new_form-input">
            <label>Поставщик (название организации)</label>
            <input type="text" v-model="name">
          </div>
          <div class="new_form-input">
            <label>Юр.Адрес</label>
            <input type="text" v-model="legal_address">
          </div>
          <div class="new_form-input">
            <label>Имя Менеджера</label>
            <input type="text" v-model="manager_name">
          </div>
          <div class="new_form-input">
            <label>Номер менеджера</label>
            <input type="text" v-model="manager_phone">
          </div>
          <div class="new_form-input">
            <label>Импорт прайс списка</label>
            <div class="new_form-file">
              <label>
                <input type="file" @change="fileChange">
                {{file_name}}
              </label>
              <button @click.stop.prevent="deleteFile">Удалить</button>
            </div>
          </div>
          <div class="new_form-actions">
            <button class="new_form-button" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import "./new_supplier.scss";
import SuppliersServices from "@/services/Suppliers";
import httpErrorHandler from "@/handlers/httpErrorHandler";
export default {
  props: {
    action: String // Для определение типа (Создание или Редактирование)
  },
  data() {
    return {
      id: "",
      name: "",
      legal_address: "",
      manager_name: "",
      manager_phone: "",
      file_name: "Выберите файл",
      file_data: ""
    };
  },
  created() {
    if (this.$route.params.hasOwnProperty("id")) {
      this.id = this.$route.params["id"];
      this.loadSupplier();
    }
  },
  methods: {
    fileChange(e) {
      console.log(e.target.files);
      this.file_name = e.target.files.length
        ? e.target.files[0].name
        : this.file_name;
      this.file_data = e.target.files.length ? e.target.files[0] : "";
    },
    deleteFile() {
      this.file_name = "Выберите файл";
      this.file_data = "";
      return false;
    },
    createFormData() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("legal_address", this.legal_address);
      formData.append("manager_name", this.manager_name);
      formData.append("manager_phone", this.manager_phone);
      formData.append("file", this.file_data);
      return formData;
    },
    async loadSupplier() {
      try {
        const response = await SuppliersServices.getOneSupplier(this.id);
        const supplier = response.data || {};
        this.name = supplier.name || "";
        this.legal_address = supplier.legal_address || "";
        this.manager_name = supplier.manager_name || "";
        this.manager_phone = supplier.manager_phone || "";
      } catch (err) {
        this.$swal(httpErrorHandler(err));
      }
    },
    async addNewSupplier() {
      try {
        let response = null;
        let formData = this.createFormData();
        if (!this.id && this.action === "NEW") {
          response = await SuppliersServices.addSupplier(formData, {
            headers: {
              "content-type": "multipart/form-data"
            }
          });
        } else {
          response = await SuppliersServices.updateSupplier(this.id, formData, {
            headers: {
              "content-type": "multipart/form-data"
            }
          });
        }
        console.log(response);
        this.$router.push("/suppliers");
      } catch (err) {
        console.log(err);
        this.$swal(httpErrorHandler(err));
      }
    }
  }
};
</script>