<template>
  <div class="input-counter">
      <div class="input-counter__btn" @click="changeValue++"></div>
      <div class="input-counter__btn" @click="changeValue--"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  computed: {
    changeValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
