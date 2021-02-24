<template>
  <label class="custom-input">
    <input type="radio" :checked="isChecked" :name="name" @change="changeValue">
    <span class="custom-input__radio"></span>
    <span v-html="title"></span>
  </label>
</template>

<script>
import eventBus from '@/eventBus';

export default {
  props: {
    title: String,
    name: String,
    value: String,
    isChecked: Boolean,
  },
  methods: {
    changeValue() {
      eventBus.$emit('change', this.value);
    },
  },
};
</script>
