<template>
  <div class="new_supplier-page">
    <div class="new_supplier">
      <v-navigation v-bind:name="title" allowBack></v-navigation>
      <div class="new_supplier-content content" ref="formContainer">
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
import SuppliersServices from "@/services/Suppliers";
import httpErrorHandler from "@/handlers/httpErrorHandler";
export default {
  props: {
    action: String, // Для определение типа (Создание или Редактирование)
    title: String
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
      this.getCurrentSupplier();
    }
  },
  methods: {
    fileChange(e) {
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
    showLoadingOverlay() {
      return this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true
      })
    },
    async getCurrentSupplier() {
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
      let response = null;
      let formData = this.createFormData();
      let loader = this.showLoadingOverlay();
      try {
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
        this.$store.commit("pushNotification", response.data.message);
        this.$router.push("/suppliers");
      } catch (err) {
        this.$swal(httpErrorHandler(err));
      } finally {
        loader.hide();
      }
    }
  }
};
</script>