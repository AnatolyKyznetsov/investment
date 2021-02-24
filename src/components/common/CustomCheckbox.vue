<template>
  <label class="custom-input">
    <input type="checkbox" v-model="changeValue">
    <span class="custom-input__checkbox"></span>
    <span v-html="title"></span>
  </label>
</template>

<script>
export default {
  props: {
    title: String,
    isChecked: Boolean,
  },
  computed: {
    changeValue: {
      get() {
        return this.isChecked;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
