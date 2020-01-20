<template>
  <div class="navigation">
    <div class="navigation__links">
        <div 
          class="navigation__link"
          v-for="(item, i) in links"
          :key="i"
        >
          <router-link :to="item.to">
            {{ item.title }}
          </router-link>
          <i 
            v-if="links.length > 1 && links.length - 1 > i" 
            class="material-icons">
            arrow_forward_ios
          </i>
        </div>
      </div>
    <div 
      v-if="action" 
      class="navigation__actions">
      <button @click="() => $emit('click')">
        <span>+</span>
        {{action}}
      </button>
    </div>
  </div>
</template>
<script>
import "./navigation.scss";
export default {
  props: {
    links: {
      type: Array,
      required: true
    },
    action: {
      type: String,
      required: false
    }
  }
}
</script>