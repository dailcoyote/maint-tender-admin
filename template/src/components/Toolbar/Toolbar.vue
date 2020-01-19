<template>
  <div class="toolbar">
    <div class="toolbar_title">
      <div 
        class="toolbar_button"
        @click="sidebar = true"
      >
        <i class="material-icons">menu</i>
      </div>
      <h1>
        Tender Invest
      </h1>
    </div>
    <transition name="open_sidebar">
      <v-sidebar 
        v-if="sidebar" 
        @close="sidebar = false" 
      />
    </transition>
  </div>
</template>
<script>
import "./toolbar.scss";
import VSidebar from "../Sidebar/Sidebar";
export default {
  components: {
    VSidebar
  },
  data() {
    return {
      sidebar: false
    }
  }
}
</script>