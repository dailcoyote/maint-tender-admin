<template>
  <v-snackbar
    ref="snackbar"
    baseSize="200px;"
    position="bottom-left"
    :holdTime="3000"
    :multiple="true"
  ></v-snackbar>
</template>
<script>
export default {
  props: {
    list: Array
  },
  mounted() {
    this.show();
    this.$emit("on_notification_shown");
  },
  methods: {
    show() {
      this.list.forEach(message => {
        this.$refs.snackbar.open(message);
      });
    }
  }
};
</script>


